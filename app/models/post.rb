class Post < ApplicationRecord
  belongs_to :user
  mount_uploaders :images, ImageUploader

  validates :title, presence: true
  validate :confirmation_post_form

  def confirmation_post_form
    errors.add(:base, "画像または本文が必要です") unless content.present? ^ images?
  end
end
