class CreateDrivers < ActiveRecord::Migration[5.2]
  def change
    create_table :drivers do |t|

      t.string :username
      t.string :password
      t.string :lastname
      t.string :firstname

      t.timestamps
    end
  end
end
