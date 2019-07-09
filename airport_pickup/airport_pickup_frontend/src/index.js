document.addEventListener('DOMContentLoaded', (event) => {

    const mainPage = () =>{
        let body = document.body
        body.innerHTML = "";
        const div = document.createElement("div")
        div.id = "welcome"
        const h3 = document.createElement("h3")
        h3.innerText = "What would you like to do?"
        const login_button = document.createElement("button")
        login_button.id = "login"
        login_button.innerText = "Login"
        const submit_button = document.createElement("button")
        submit_button.innerText = "Submit"
        submit_button.id = "submit"
        body.appendChild(div)
        div.appendChild(h3)
        div.appendChild(login_button)
        div.appendChild(submit_button)
        
    }
    mainPage();

    // console.log('hello')

    // const currentDriver = { id: 1, username: "new" }

    // const DRIVERS_URL = 'http://localhost:3000/drivers'
    // const AIRPORTS_URL = 'http://localhost:3000/airports'
    // const PICKUPS_URL = 'http://localhost:3000/pickups'

    // const apiKey = 'e5afcd-79f8bd'

    // const newDriverForm = document.querySelector('#new-driver-form')
    // const newPickUpForm = document.querySelector('#new-pickup-form')
    // const estimatedTimeDiv = document.querySelector('#estimated-arrival')

    // newPickUpForm.addEventListener('submit', event => {
    //     event.preventDefault()

    //     console.log('submit')

    //     const passengerName = event.target.elements.name.value
    //     const flightNumber = event.target.elements.flightNumber.value
    //     const driver = currentDriver.id
    //     const selectedAirport = document.querySelector('#airport-drop-down')
    //     const airport = selectedAirport.selectedIndex + 1 ;

    //     console.log(airport)

    //    const airportCode = event.target.elements.airport.value

    //    console.log(airportCode)

    //     getFlightInfo(airportCode, flightNumber)

    //     createPickup({passenger_name: passengerName, flight_number: flightNumber, driver_id: driver, airport_id: airport})
    // })

    // const getFlightInfo = (airportCode, flightNumber) => {

    //     fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${airportCode}&type=arrival`)
    //         .then(response => response.json())
    //         .then(data => findFlight(data, flightNumber))
    // }
    
    // const findFlight = (flightData, flightNumber) => {
    //    console.log(flightData)
    //    console.log(flightNumber)
    //    const new_array = []
    //    let status;
    //    for(let i=0;i < flightData.length;i++)
    //    {
    //        if(flightData[i].flight.iataNumber === flightNumber)
    //        {
    //            status = flightData[i].status
    //            new_array.push(flightData[i].arrival)
    //        }
    //    }
    //    estimatedTime(new_array,status);
    // }

    // const estimatedTime = (new_array,status) =>{
    //     console.log(status)
    //     estimatedTimeDiv.innerHTML = ""
    //     div = document.createElement("div")
    //     let d = new Date(new_array[0].estimatedTime)
    //     let l = new Date(new_array[0].scheduledTime)
    //     const landing_time = d.toLocaleTimeString('en-UK')
    //     const scheduled_landing_time = l.toLocaleTimeString('en-UK')
    //     if(status === "landed"){
    //         div.innerText = `Your flight has landed at: ${landing_time}`
    //     }
    //     else if(status === "active"){
    //         div.innerText = `Your flight is due to land at: ${landing_time}`
    //     }
    //     else{
    //         div.innerText = `Your flight is due to land at: ${scheduled_landing_time}`
    //     }
        
    //     estimatedTimeDiv.appendChild(div)

    // }




    // const createPickup = (pickupData) => {

    //     console.log(pickupData)

    //     fetch(PICKUPS_URL, {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }, 
    //         body: JSON.stringify(pickupData)
    //     })
    //     .then(response => response.json())
    //     .then(console.log)
    // }

    // newDriverForm.addEventListener('submit', event => {

    //     event.preventDefault()

    //     debugger

    //     const driverName = event.target.elements.name.value

    //     createDriver({username: driverName})

    //     console.log('submit')
    // })

    // const createDriver = driverData => {

    //     fetch(DRIVERS_URL, {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }, 
    //         body: JSON.stringify(driverData)
    //     })
    //     .then(response => response.json())
    //     .then(console.log)
    // }


    
});
