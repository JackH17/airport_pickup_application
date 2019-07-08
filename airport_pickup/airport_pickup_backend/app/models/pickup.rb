class Pickup < ApplicationRecord
  belongs_to :driver
  belongs_to :airport
end
