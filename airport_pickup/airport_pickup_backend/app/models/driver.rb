class Driver < ApplicationRecord
    has_many :pickups
    has_many :airports, through: :pickups
    
end
