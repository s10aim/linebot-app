class AddIndexToPosts < ActiveRecord::Migration[6.0]
  def change
    add_index :posts, [:title, :user_id], unique: true
  end
end
