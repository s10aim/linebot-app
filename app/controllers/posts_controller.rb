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
    @keywords = current_user.posts.pluck(:title)
  end

  def create
    @post = current_user.posts.build(post_params)
    if params[:file].present?
      @post.images = params[:file].values
      @post.save!
      render json: {}
    else
      @post.save!
      redirect_to root_path
    end
  end

  def edit
    @keywords = current_user.posts.pluck(:title) - [@post[:title]]
  end

  def update
    remove_images(params[:indexes])
    add_more_images(params[:file]&.values)
    @post.update!(post_params.except(:images))
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { render json: {} }
    end
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

  def remove_image_at_index(index)
    remain_images = @post.images
    if index == 0 && @post.images.size == 1
      @post.remove_images!
    else
      deleted_image = remain_images.delete_at(index)
      deleted_image.try(:remove!)
      @post.images = remain_images
    end
  end

  def remove_images(indexes)
    return if indexes.blank?

    sorted_indexes = indexes.map(&:to_i).sort.reverse
    # index番号が小さい方から消してしまうと配列の番号が入れ替わる
    # 番号が大きいものから削除するためにsortとreverse

    sorted_indexes.each do |index|
      remove_image_at_index(index)
    end
  end

  def post_params
    params.require(:post).permit(:title, :content, :random)
  end
end
