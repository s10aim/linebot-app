class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :correct_user, only: %i[edit update destroy]

  def index
    @posts = current_user.posts.order(id: :asc)
  end

  def show
    @post = Post.find(params[:id])
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
  end

  def destroy
    @post.destroy!
    redirect_to root_path
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end

  def correct_user
    # binding.pry
    @post = current_user.posts.find_by(id: params[:id])
    redirect_to root_path if @post.nil?
  end
end
