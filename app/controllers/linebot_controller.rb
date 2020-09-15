class LinebotController < ApplicationController
  require "line/bot"

  protect_from_forgery :except => [:callback]

  def callback
    body = request.body.read
    signature = request.env["HTTP_X_LINE_SIGNATURE"]
    unless client.validate_signature(body, signature)
      error 400 do "Bad Request" end
    end
    events = client.parse_events_from(body)

    events.each do |event|
      case event
      when Line::Bot::Event::Message
        case event.type
        when Line::Bot::Event::MessageType::Text
          title = event.message["text"]
          post = Post.find_by(title: title)

          if post.nil?
            message = {
              type: "text",
              text: "返すものがないよん(´·ω·`)",
            }
          else
            image = post.images.sample
            content = post.content

            if content.present?
              message = {
                type: "text",
                text: content,
              }
            elsif image.present?
              message = {
                type: "image",
                originalContentUrl: image.url,
                previewImageUrl: image.url,
              }
            end
          end
        end
      end
      client.reply_message(event["replyToken"], message)
    end
    head :ok
  end

  private

  def client
    @client ||= Line::Bot::Client.new { |config|
      config.channel_secret = ENV["LINE_CHANNEL_SECRET"]
      config.channel_token = ENV["LINE_CHANNEL_TOKEN"]
    }
  end
end