class BusinessPickup < ApplicationRecord
  belongs_to :airport
  belongs_to :driver
end
