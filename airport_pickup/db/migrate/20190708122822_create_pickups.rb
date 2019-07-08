class CreatePickups < ActiveRecord::Migration[5.2]
  def change
    create_table :pickups do |t|

      t.string :passenger_name
      t.string :flight_number
      t.references :driver, foreign_key: true
      t.references :airport, foreign_key: true

      t.timestamps
    end
  end
end
