class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :correct_user, only: %i[show edit update destroy]

  def index
    @posts = current_user.posts.order(id: :asc)
  end

  def show
  end

  def new
    @post = Post.new
  end

  def create
    @post = current_user.posts.build(post_params)
    @post.save!
    redirect_to root_path
  end

  def edit
  end

  def update
    add_more_images(post_params[:images])
    @post.update!(post_params.except(:images))
    redirect_to root_path
  end

  def destroy
    @post.destroy!
    redirect_to root_path
  end

  private

  def correct_user
    @post = current_user.posts.find_by(id: params[:id])
    redirect_to root_path if @post.nil?
  end

  def add_more_images(new_images)
    if new_images.present?
      images = @post.images
      images += new_images
      @post.images = images
    end
  end

  def post_params
    params.require(:post).permit(:title, :content, { images: [] })
  end
end
