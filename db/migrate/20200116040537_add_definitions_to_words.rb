class AddDefinitionsToWords < ActiveRecord::Migration[6.0]
  def change
    add_column :words, :definitions, :string, array: true, default: []
    add_column :words, :examples, :string, array: true, default: []
    add_index :words, :definitions, using: 'gin'
    add_index :words, :examples, using: 'gin'
  end
end
