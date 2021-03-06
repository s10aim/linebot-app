class RemoveColumnsFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_index :users, :reset_password_token
    remove_column :users, :reset_password_token, :string
    remove_column :users, :reset_password_sent_at, :datetime
  end
end
