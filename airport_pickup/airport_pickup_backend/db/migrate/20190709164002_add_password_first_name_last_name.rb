class AddPasswordFirstNameLastName < ActiveRecord::Migration[5.2]
  def change
    add_column :drivers, :password, :string
    add_column :drivers, :firstname, :string
    add_column :drivers, :lastname, :string
  end
end
