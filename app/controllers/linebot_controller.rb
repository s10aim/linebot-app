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
          current_user = User.find_by(uid: event["source"]["userId"])
          title = event.message["text"]
          post = current_user.posts.find_by(title: title)
          lists = current_user.posts.pluck(:title).join("\r\n\r\n")

          if Post::KEYWORDS_LIST.include?(title)
            message = {
              type: "text",
              text: lists,
            }
          elsif post.nil?
            message = {
              type: "text",
              text: "返すものがないよん(´·ω·`)",
            }
          else
            content = post.content
            images = post.images
            random_image = images.sample

            if content.present?
              if post.random
                random_content = content.split(/\R{3,}/).sample
                random_content.slice!(/\A・/)

                message = {
                  type: "text",
                  text: random_content,
                }
              else
                message = {
                  type: "text",
                  text: content,
                }
              end
            elsif images.present?
              if post.random
                message = {
                  type: "image",
                  originalContentUrl: random_image.url,
                  previewImageUrl: random_image.url,
                }
              else
                message = images.map do |image|
                  {
                    type: "image",
                    originalContentUrl: image.url,
                    previewImageUrl: image.url,
                  }
                end
              end
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
