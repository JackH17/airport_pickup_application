class Driver < ApplicationRecord
    has_many :pickups
    has_many :airports, through: :pickups
    validates :firstname, presence: true
    validates :lastname, presence: true
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
    
end
