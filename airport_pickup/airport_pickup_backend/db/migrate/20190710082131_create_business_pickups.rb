class CreateBusinessPickups < ActiveRecord::Migration[5.2]
  def change
    create_table :business_pickups do |t|
      t.string :passenger_name
      t.string :flight_number
      t.string :status
      t.string :time
      t.references :airport, foreign_key: true
      t.references :driver, foreign_key: true
      t.integer :terminal
      t.string :passenger_name

      t.timestamps
    end
  end
end
