class ChangeDatatypeImagesToPosts < ActiveRecord::Migration[6.0]
  def change
    change_column :posts, :images, :json
  end
end
