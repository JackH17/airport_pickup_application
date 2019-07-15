# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


airports = Airport.create([{name: 'Heathrow Airport', code: 'LHR', status:'open'}, {name: 'Gatwick Airport', code: 'LGW', status:'open'}, {name: 'Stansted Airport', code: 'STN', status:'open'}, {name: 'London City Airport', code: 'LCY', status:'open'}, {name: 'Luton Aitport', code: 'LTN', status:'open'} ])

currentDriver = Driver.create({firstname: "jack", lastname: "nicholson", username: "new", password:"password"})
currentDriver2 = Driver.create({firstname: "pedro", lastname: "nicholson", username: "new1", password:"password"})

BusinessPickup.create({flight_number: "LY8010", status: "Landed", time: "10:10:00 PM", airport_id: 1, terminal: "5", passenger_name: "Rob Stark", driver_id: 1})
