class Post < ApplicationRecord
  belongs_to :user
  mount_uploaders :images, ImageUploader

  validates :title, presence: true, uniqueness: { scope: :user_id }
  validate :confirmation_post_form

  def confirmation_post_form
    errors.add(:base, "画像または本文が必要です") unless content.present? ^ images?
  end
end
