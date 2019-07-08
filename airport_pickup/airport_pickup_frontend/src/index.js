document.addEventListener('DOMContentLoaded', (event) => {

    console.log('hello')

    const currentDriver = { id: 1, username: "new" }

    const DRIVERS_URL = 'http://localhost:3000/drivers'
    const AIRPORTS_URL = 'http://localhost:3000/airports'
    const PICKUPS_URL = 'http://localhost:3000/pickups'

    const apiKey = 'e5afcd-79f8bd'

    const newDriverForm = document.querySelector('#new-driver-form')
    const newPickUpForm = document.querySelector('#new-pickup-form')

    newPickUpForm.addEventListener('submit', event => {
        event.preventDefault()

        console.log('submit')

        const passengerName = event.target.elements.name.value
        const flightNumber = event.target.elements.flightNumber.value
        const driver = currentDriver.id
        const selectedAirport = document.querySelector('#airport-drop-down')
        const airport = selectedAirport.selectedIndex + 1 ;

        console.log(airport)

       const airportCode = event.target.elements.airport.value

       console.log(airportCode)

        getFlightInfo(airportCode)

        createPickup({passenger_name: passengerName, flight_number: flightNumber, driver_id: driver, airport_id: airport})
    })

    const getFlightInfo = (airportCode) => {

        fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${airportCode}&type=arrival`)
            .then(response => response.json())
            .then(data => showData(data))
    }
    
    const showData = flightData => {
       console.log(flightData)
    }

    const createPickup = (pickupData) => {

        console.log(pickupData)

        fetch(PICKUPS_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(pickupData)
        })
        .then(response => response.json())
        .then(console.log)
    }

    newDriverForm.addEventListener('submit', event => {

        event.preventDefault()

        debugger

        const driverName = event.target.elements.name.value

        createDriver({username: driverName})

        console.log('submit')
    })

    const createDriver = driverData => {

        fetch(DRIVERS_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(driverData)
        })
        .then(response => response.json())
        .then(console.log)
    }
    
});
