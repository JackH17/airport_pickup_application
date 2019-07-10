class Airport < ApplicationRecord
    has_many :pickups
    has_many :drivers, through: :pickups


  def self.airport_name(airport)
    case airport
      when "LHR"
        1
      when "LGW"
        2
      when "STN"
        3
      when "LCY"
        4
      else
        "Error: we don't have information on this Airport"
    end
  end
end
