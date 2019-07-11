document.addEventListener('DOMContentLoaded', (event) => {



    console.log('hello')

    const currentDriver = { id: 1, username: "new" }

    const DRIVERS_URL = 'http://localhost:3000/drivers'
    const AIRPORTS_URL = 'http://localhost:3000/airports'
    const PICKUPS_URL = 'http://localhost:3000/pickups'
    const BUSINESS_PICKUPS_URL = 'http://localhost:3000/business_pickups'

    const apiKey = 'e5afcd-79f8bd'

    const newDriverForm = document.querySelector('#new-driver-form')
    const newPickUpForm = document.querySelector('#new-pickup-form')
    const estimatedTimeDiv = document.querySelector('#estimated-arrival')
    const flightNumberOnlyForm = document.querySelector('#flight-number-form')
    const showFlightsDiv = document.getElementById("showFlightsDiv")
    const div = document.getElementById("flight-list-div")
    div.innerHTML = "My Active Landings"
    const showMyFlightsButton = document.createElement("button")
    showMyFlightsButton.innerHTML = "Show My Flights"
    showFlightsDiv.append(showMyFlightsButton)



    showMyFlightsButton.addEventListener("click", function(e){
    div.innerHTML = ""
    showCurrentFlights()

    showMyFlightsButton.innerHTML = 'Refresh Landing Times'
    })

    const array = []
    const gArray = []
    const sArray = []
    const cArray = []
    const allLondonFlightsToday = []




    function showCurrentFlights(){
      // this runs when you hit the show flights button as it needs the data to be fetched before it can work :)
      // it is going to match the data in our API with the flights API to get accurate times and data on any button hit
      // once we have the flight data we can render the data to the page
      const megaFlightsArray = allLondonFlightsToday.flat()
      const freshFlightData = []
      // console.log(megaFlightsArray)
      fetch(BUSINESS_PICKUPS_URL)
        .then(resp => resp.json())
        .then(savedLandings => {
          const myLandings = savedLandings.filter(function(landing) {
            return landing.driver_id === currentDriver.id })
            // console.log(myLandings)
              myLandings.forEach(function(landing){
                // for (let i=0; i<=megaFlightsArray.length; i++){
                megaFlightsArray.forEach(function(flight){
                  if (flight.flight.iataNumber === landing.flight_number){

                      renderLanding(flight, landing)
                    }

                    // use flight number to get accurate landing data for my flights
                    // renderLanding(landing)
                })
              })
            })

          }



    function renderLanding(flight, landing){
      // console.log(flight, landing)

      let e = new Date(flight.arrival.estimatedTime)
      let s = new Date(flight.arrival.scheduledTime)
      const estimatedLandingTime = e.toLocaleTimeString('en-UK')
      const scheduledLandingTime = s.toLocaleTimeString('en-UK')


      const li = document.createElement("li")
      li.className = "li"
      const flightNumberSpan = document.createElement("span")
      const statusSpan = document.createElement("span")
      const timeSpan = document.createElement("span")
      const airportSpan = document.createElement("span")
      const terminalSpan = document.createElement("span")
      const passengerSpan = document.createElement("span")
      const button = document.createElement("button")
//airport name, time,

      if(flight.status === "landed"){
          timeSpan.innerHTML = `Landed at: ${estimatedLandingTime} `
      }
      else if(flight.status === "active"){
          timeSpan.innerHTML = `Estimated Landing Time: ${estimatedLandingTime} `
      }
      else{
          timeSpan.innerHTML = `Scheduled Landing Time ${scheduledLandingTime} `
      }
      statusSpan.innerHTML = `Status: ${flight.status} `
      airportSpan.innerHTML = `Airport: ${landing.airport.name}  `
      // ${flight.arrival.iataCode}
      terminalSpan.innerHTML = `Terminal: ${flight.arrival.terminal} `
      passengerSpan.innerHTML = `Passenger: ${landing.passenger_name} `
      flightNumberSpan.innerHTML = `Flight Number: ${flight.flight.iataNumber} `
      button.innerHTML = "Delete Landing"

      // const flightNumberMatched = flightArray[i].flight.iataNumber
      // const status = flightArray[i].status
      // const estimatedTime = flightArray[i].arrival.estimatedTime
      // const scheduledTime = flightArray[i].arrival.scheduledTime
      // const airport = flightArray[i].arrival.iataCode
      // const terminal = flightArray[i].arrival.terminal

      // createLanding({flight_number: flightNumber, status: status, time: time, code: code, terminal: terminal, passenger_name: passenger_name, driver_id: currentDriver.id}, button)
      // createPickup({passenger_name: passengerName, flight_number: flightNumber, driver_id: currentDriver.id, airport_id: airport})

      div.append(li)
      li.append(flightNumberSpan, statusSpan, timeSpan, airportSpan, terminalSpan, passengerSpan, button)
      button.addEventListener("click", function(e){
        fetch(`${BUSINESS_PICKUPS_URL}/${landing.id}`, {
          method: "DELETE"
        })
        .then(resp => resp.json())
        .then(() => li.remove())
      })
      return div

    }



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

        getFlightInfo(airportCode, flightNumber)
        // getFlightInfo2(flightNumber)

        createPickup({passenger_name: passengerName, flight_number: flightNumber, driver_id: driver, airport_id: airport})
    })

    flightNumberOnlyForm.addEventListener('submit', function(e){
        e.preventDefault()
        // showCurrentFlights()
        const passengerName = e.target.elements.paxName.value
        const flightNumberOnly = e.target.elements.flightNumberOnly.value.toUpperCase()
        const driver = currentDriver.id
        // createPickup({passenger_name: passengerName, flight_number: flightNumberOnly, driver_id: driver})
        // console.log(allLondonFlightsToday[0][0].flight.iataNumber)
        const megaFlightsArray = allLondonFlightsToday.flat()
        getInfoUsingFlightNumber(megaFlightsArray, flightNumberOnly, passengerName)

    })

    // const array = []
    // const gArray = []
    // const sArray = []
    // const cArray = []
    // const allLondonFlightsToday = []

      function heathrowFlights(){
            fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=LHR&type=arrival`)
            .then(response => response.json())
            .then(arr => arr.forEach(function(e){
              array.push(e)
            }))
          }
      function gatwickFlights(){
          fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=LGW&type=arrival`)
          .then(response => response.json())
          .then(arr => arr.forEach(function(e){
            gArray.push(e)
          }))
        }
      function stanstedFlights(){
          fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=STN&type=arrival`)
          .then(response => response.json())
          .then(arr => arr.forEach(function(e){
            sArray.push(e)
          }))
        }
      function cityFlights(){
          fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=LCY&type=arrival`)
          .then(response => response.json())
          .then(arr => arr.forEach(function(e){
            cArray.push(e)
          }))
        }

      function makeMainFlights(){
        heathrowFlights()
        gatwickFlights()
        stanstedFlights()
        cityFlights()
        allLondonFlightsToday.push(array, gArray, sArray, cArray)
      }
        makeMainFlights()


    function getInfoUsingFlightNumber(flightArray, flightNumber, passengerName){
      console.log(flightArray)
      // console.log(flightNumber)
      // console.log(passengerName)
      for (let i=0; i<=flightArray.length; i++){
        if (flightArray[i].flight.iataNumber === flightNumber){
          console.log(flightArray[i])

          const flightNumberMatched = flightArray[i].flight.iataNumber
          const status = flightArray[i].status
          const estimatedTime = flightArray[i].arrival.estimatedTime
          const scheduledTime = flightArray[i].arrival.scheduledTime
          const airport = flightArray[i].arrival.iataCode
          const terminal = flightArray[i].arrival.terminal
          let d = new Date(estimatedTime)
          let l = new Date(scheduledTime)
          const estimatedLandingTime = d.toLocaleTimeString('en-UK')
          const scheduledLandingTime = l.toLocaleTimeString('en-UK')

          makeLandingCard(flightNumber, status, scheduledLandingTime, airport, terminal, passengerName)
          // "AA6690"
        }
      }
    }


    function makeLandingCard(flightNumber, status, time, code, terminal, passenger_name){
      // const div = document.getElementById("flight-list-div")
      const li = document.createElement("li")
      const flightNumberSpan = document.createElement("span")
      const statusSpan = document.createElement("span")
      const timeSpan = document.createElement("span")
      const airportSpan = document.createElement("span")
      const terminalSpan = document.createElement("span")
      const passengerSpan = document.createElement("span")
      const button = document.createElement("button")

      flightNumberSpan.innerHTML = `Flight Number: ${flightNumber} `
      statusSpan.innerHTML = `Status: ${status} `
      timeSpan.innerHTML = `Landing Time: ${time} `
      airportSpan.innerHTML = `Airport: ${code} `
      terminalSpan.innerHTML = `Terminal: ${terminal} `
      passengerSpan.innerHTML = `Passenger: ${passenger_name} `
      button.innerHTML = "Delete Landing"


      createLanding({flight_number: flightNumber, status: status, time: time, code: code, terminal: terminal, passenger_name: passenger_name, driver_id: currentDriver.id}, button, li)
      // createPickup({passenger_name: passengerName, flight_number: flightNumber, driver_id: currentDriver.id, airport_id: airport})


      div.append(li)
      li.append(flightNumberSpan, statusSpan, timeSpan, airportSpan, terminalSpan, passengerSpan, button)
      return div


    }

    function createLanding(landingData, button, li){
      fetch(BUSINESS_PICKUPS_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(landingData)
      })
      .then(response => response.json())
      .then(landing => {
        button.addEventListener("click", function(e){
          fetch(`${BUSINESS_PICKUPS_URL}/${landing.id}`, {
            method: "DELETE"
          })
          .then(resp => resp.json())
          .then(() => li.remove())
          // render landing to page
        })
      })
    }







    const findFlight = (flightData, flightNumber) => {
       console.log(flightData)
       console.log(flightNumber)
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
       estimatedTime(new_array,status);
    }

    const estimatedTime = (new_array,status) =>{
        console.log(status)
        estimatedTimeDiv.innerHTML = ""
        div = document.createElement("div")
        let d = new Date(new_array[0].estimatedTime)
        let l = new Date(new_array[0].scheduledTime)
        const landing_time = d.toLocaleTimeString('en-UK')
        const scheduled_landing_time = l.toLocaleTimeString('en-UK')
        if(status === "landed"){
            div.innerText = `Your flight has landed at: ${landing_time}`
        }
        else if(status === "active"){
            div.innerText = `Your flight is due to land at: ${landing_time}`
        }
        else{
            div.innerText = `Your flight is due to land at: ${scheduled_landing_time}`
        }

        estimatedTimeDiv.appendChild(div)

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
