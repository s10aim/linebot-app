class ChangeDatatypeImagesToPosts < ActiveRecord::Migration[6.0]
  def change
    remove_column :posts, :images
    add_column :posts, :images, :json
  end
end
