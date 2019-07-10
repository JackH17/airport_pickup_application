class ChangeDataTypeForStage < ActiveRecord::Migration[5.2]
  def change
    change_column :business_pickups, :terminal, :string
  end
end
