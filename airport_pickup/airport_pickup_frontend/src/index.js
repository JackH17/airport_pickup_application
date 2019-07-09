document.addEventListener('DOMContentLoaded', (event) => {

    console.log('hello')

    const currentDriver = { id: 1, username: "new" }

    const DRIVERS_URL = 'http://localhost:3000/drivers'
    const AIRPORTS_URL = 'http://localhost:3000/airports'
    const PICKUPS_URL = 'http://localhost:3000/pickups'

    const apiKey = 'e5afcd-79f8bd'

    const newDriverForm = document.querySelector('#new-driver-form')
    const newPickUpForm = document.querySelector('#new-pickup-form')
    const estimatedTimeDiv = document.querySelector('#estimated-arrival')
    const addedWaitTimeDiv = document.querySelector('#added-wait-time')

    newPickUpForm.addEventListener('submit', event => {
        event.preventDefault()

        console.log('submit')

        const passengerName = event.target.elements.name.value
        const flightNumber = event.target.elements.flightNumber.value
        const driver = currentDriver.id
        const selectedAirport = document.querySelector('#airport-drop-down')
        const airport = selectedAirport.selectedIndex + 1 ;


       const airportCode = event.target.elements.airport.value


        getFlightInfo(airportCode, flightNumber)

        createPickup({passenger_name: passengerName, flight_number: flightNumber, driver_id: driver, airport_id: airport})
    })

    const getFlightInfo = (airportCode, flightNumber) => {

        fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${airportCode}&type=arrival`)
            .then(response => response.json())
            .then(data => findFlight(data, flightNumber))
    }
    
    const findFlight = (flightData, flightNumber) => {
       
       console.log(flightData)
       const new_array = []
       let status;
       for(let i=0;i < flightData.length;i++)
       {
           if(flightData[i].flight.iataNumber === flightNumber)
           {
               status = flightData[i].status
               new_array.push(flightData[i].arrival)
           }
       }
       let array_of_hours = []
       let our_hour = new_array[0].scheduledTime
       let our_flight_hour = new Date(our_hour)
       let our_flight_hour_for_compare = our_flight_hour.getHours()
       
       console.log(our_flight_hour_for_compare)

       for(let i=0;i<flightData.length;i++){
           let extract_hour = new Date(flightData[i].arrival.scheduledTime)
            array_of_hours.push(extract_hour.getHours())
       }
       console.log(evaluateHour(array_of_hours,our_flight_hour_for_compare))
       estimatedTime(new_array,status)
    }

    const evaluateHour = (array_of_hours,our_flight_hour_for_compare) => {
        let counter = 0;
        for(let i=0;i<array_of_hours.length;i++)
        {
            if(array_of_hours[i] === our_flight_hour_for_compare)
            {
                counter++
            }
        }
        
        addWaitingTime(counter)
    }

    const addWaitingTime = counter => {

        const waitingTimeDiv = document.createElement('div')
        const waitingTime = document.createElement('p')



        if(counter > 100){
            waitingTime.innerText = 'Due to high volume of flights we would suggest leaving 1 hour to clear security and arrivals'
        } 
        waitingTimeDiv.appendChild(waitingTime)


        addedWaitTimeDiv.appendChild(waitingTimeDiv)
    }

    const estimatedTime = (new_array,status) =>{
        estimatedTimeDiv.innerHTML = ""
        div = document.createElement("div")
        let d = new Date(new_array[0].estimatedTime)
        let l = new Date(new_array[0].scheduledTime)
        const landing_time = d.toLocaleTimeString('en-UK')
        const scheduled_landing_time = l.toLocaleTimeString('en-UK')
        if(status === "landed"){
            div.innerText = `Your flight has landed at: ${landing_time}`
            convertTime(d)
        }
        else if(status === "active"){
            div.innerText = `Your flight is due to land at: ${landing_time}`
            convertTime(d)

        }
        else{
            div.innerText = `Your flight is due to land at: ${scheduled_landing_time}`
            convertTime(l)
        } 
        estimatedTimeDiv.appendChild(div)
    }



    const convertTime = time => {
        const compareTime = (time.toISOString())

        filterFlights(time, compareTime)
    }

    const filterFlights = (time, compareTime) => {

        time.toISOString()
        console.log(time)
        console.log(compareTime)
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
