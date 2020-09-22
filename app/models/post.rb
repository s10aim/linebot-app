class Post < ApplicationRecord
  KEYWORDS_LIST = %w[リスト].freeze

  belongs_to :user
  mount_uploaders :images, ImageUploader

  validates :title, presence: true, uniqueness: { scope: :user_id }
  validate :confirmation_post_form
  validate :post_random_images
  validate :confirmation_keywords_list

  def confirmation_post_form
    errors.add(:base, "画像または本文が必要です") unless content.present? ^ images?
  end

  def post_random_images
    if images.length > 5 && !random
      errors.add(:base, "全ての画像を送信する場合は5枚以下にして下さい")
    end
  end

  def confirmation_keywords_list
    if KEYWORDS_LIST.include?(title)
      errors.add(:base, "タイトルは「#{KEYWORDS_LIST.join(",")}」以外で入力して下さい")
    end
  end
end
