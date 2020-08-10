class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :content
      t.string :images
      t.integer :position
      t.boolean :random, default: false, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
