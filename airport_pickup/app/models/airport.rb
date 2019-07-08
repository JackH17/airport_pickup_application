class Airport < ApplicationRecord
    has_many :pickups
    has_many :drivers, through: :pickups
end
