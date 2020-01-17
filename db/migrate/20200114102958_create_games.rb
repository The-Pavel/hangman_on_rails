class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :word
      t.string :room_name

      t.timestamps
    end
  end
end
