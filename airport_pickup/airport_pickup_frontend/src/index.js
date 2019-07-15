const body = document.body
let currentDriver;
let navbar = document.querySelector(".nav-wrapper")
let background_img = document.querySelector("#bg")

const DRIVERS_URL = 'http://localhost:3000/drivers'
const AIRPORTS_URL = 'http://localhost:3000/airports'
const PICKUPS_URL = 'http://localhost:3000/pickups'
const BUSINESS_PICKUPS_URL = 'http://localhost:3000/business_pickups'
const apiKey = 'e5afcd-79f8bd'


const addedWaitTimeDiv = document.createElement('div')
const fullFlightListDiv = document.createElement('div')


document.addEventListener('DOMContentLoaded', (event) => {
    mainPage();
})

const mainPage = () =>{

    body.innerHTML = ""

    const div = document.createElement("div")
    const h3 = document.createElement("h3")
    const login_button = document.createElement("button")
    const signup_option = document.createElement("button")
    const login_button_div = document.createElement("div")
    login_button_div.id = "login-button-div"
    const sign_up_button_div = document.createElement("div")
    login_button_div.setAttribute('align', 'center')
    sign_up_button_div.setAttribute('align', 'center')

    h3.style.textAlign = "center"
    h3.innerText = "What would you like to do?"
    h3.style.color = "white"

    login_button.id = "login"
    login_button.className = "waves-effect waves-light btn"
    login_button.innerText = "Login"

    signup_option.innerText = "Signup"
    signup_option.id = "signup"

    signup_option.className = "waves-effect waves-light btn"

    div.appendChild(h3)
    div.appendChild(login_button_div)
    div.appendChild(sign_up_button_div)

    login_button_div.appendChild(login_button)
    sign_up_button_div.appendChild(signup_option)

    body.appendChild(div)

    login_button.addEventListener("click", function() {
        Login();
    })

    signup_option.addEventListener('click', event => {
        console.log('click')
        signup();
    })
}



signup = () => {
    body.innerHTML = ""
    const div = document.createElement("div")
    const sub_div1 = document.createElement("div")
    const sub_div2 = document.createElement("div")
    const sub_div3 = document.createElement("div")
    const sub_div4 = document.createElement("div")
    const username_input = document.createElement("input")
    const password = document.createElement("input")
    const first_name_input = document.createElement("input")
    const last_name_input = document.createElement("input")
    const sign_up_button = document.createElement("button")
    const form = document.createElement("form")
    sign_up_button.innerText = "Sign Up"

    sub_div1.innerText = "First Name"
    sub_div2.innerText = "Last Name"
    sub_div3.innerText = "Username"
    sub_div4.innerText = "Password "

    first_name_input.placeholder = "Enter your First Name"
    first_name_input.id = "first_name_input"
    first_name_input.type = "text"

    last_name_input.placeholder = "Enter your Last Name"
    last_name_input.id = "last_name_input"
    last_name_input.type = "text"



    username_input.placeholder = "Enter your username"
    username_input.id = "username_input"
    username_input.type = "text"

    password.placeholder = "Password"
    password.id = "password_input"
    password.type = "password"

    sub_div1.appendChild(first_name_input)
    sub_div2.appendChild(last_name_input)
    sub_div3.appendChild(username_input)
    sub_div4.appendChild(password)

    body.appendChild(div)
    div.appendChild(form)
    form.appendChild(sub_div1)
    form.appendChild(sub_div2)
    form.appendChild(sub_div3)
    form.appendChild(sub_div4)


    form.appendChild(sign_up_button)

    sign_up_button.addEventListener('click', function(e) {
        e.preventDefault()
        let username = document.querySelector("#username_input").value
        let password = document.querySelector("#password_input").value
        let firstName = document.querySelector("#first_name_input").value
        let lastName = document.querySelector("#last_name_input").value


        let newDriverData = {username: username, password: password, firstname: firstName, lastname: lastName}
        createNewDriver(newDriverData)
    })

}


const Logout = (driver) => {
    driver = ""
    mainPage()
}

const createNewDriver = newDriverData => {
    return fetch(DRIVERS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newDriverData)
    }).then(response => response.json())
    .then(data => greetDriver(data))
}

const createNavbar = (currentDriver) =>{
    let nav = document.createElement("nav")
    let navbar_div = document.createElement("div")

    let ul_navbar_left = document.createElement("ul")
    let ul_navbar_right = document.createElement("ul")

    let li_navbar_view = document.createElement("li")
    let li_navbar_create = document.createElement("li")
    let li_navbar_logout = document.createElement("li")

    let a_view = document.createElement("a")
    let a_create = document.createElement("a")
    let a_logout = document.createElement("a")

    navbar_div.className = "nav-wrapper"

    ul_navbar_left.className = "left hide-on-med-and-down"
    ul_navbar_right.className = "right hide-on-med-and-down"

    a_view.innerText = 'View your Pickups'
    a_create.innerText = "Create a new Pickup"
    a_logout.innerText = "Logout"
    a_logout.style.alignContent = "right"

    nav.appendChild(navbar_div)

    navbar_div.appendChild(ul_navbar_left)
    navbar_div.appendChild(ul_navbar_right)

    ul_navbar_left.appendChild(li_navbar_view)
    ul_navbar_left.appendChild(li_navbar_create)
    ul_navbar_right.appendChild(li_navbar_logout
        )
    li_navbar_view.appendChild(a_view)
    li_navbar_create.appendChild(a_create)
    li_navbar_logout.appendChild(a_logout)

    body.appendChild(nav)

    li_navbar_view.addEventListener('click', event => {
        event.preventDefault()
        viewUserPickups(currentDriver)
    })

    li_navbar_create.addEventListener('click', event => {
        event.preventDefault()
        getPickUpInfo(currentDriver);
    })

    li_navbar_logout.addEventListener("click", event =>{
        event.preventDefault()
        Logout(currentDriver)
    })

}



const greetNewDriver = (driver) => {
    body.innerHTML = ""
    let currentDriver = driver;
    createNavbar(currentDriver);

}




const Login = () => {
    body.innerHTML = ""
    const div = document.createElement("div")
    const sub_div1 = document.createElement("div")
    const sub_div2 = document.createElement("div")

    const username_input = document.createElement("input")
    username_input.value = "new1"

    const password = document.createElement("input")
    password.value = "password"

    const submit_login_button = document.createElement("button")
    const form = document.createElement("form")
    submit_login_button.innerText = "Login"

    sub_div1.innerText = "Username: "
    sub_div2.innerText = "Password "

    username_input.placeholder = "Enter your username"
    username_input.id = "username_input"
    username_input.type = "text"

    password.placeholder = "Password"
    password.id = "password_input"
    password.type = "password"

    sub_div1.appendChild(username_input)
    sub_div2.appendChild(password)

    body.appendChild(div)
    div.appendChild(form)
    form.appendChild(sub_div1)
    form.appendChild(sub_div2)
    form.appendChild(submit_login_button)

    submit_login_button.addEventListener("click", function(e){
        e.preventDefault()
        fetchDrivers()
    })
}

const fetchDrivers = () =>{

        fetch(DRIVERS_URL)
        .then(response => response.json())
        .then(drivers => {
            validateLogin(drivers);
        })
}

 const validateLogin = (driverArray) =>{
        let username = document.querySelector("#username_input").value
        let password = document.querySelector("#password_input").value

        username.required = true;
        password.required = true;
        let flag = -1;
        for(i=0;i < driverArray.length;i++)
        {
            if(driverArray[i].username === username && driverArray[i].password === password)
            {
                flag = i
            }
        }
        if(flag === -1)
        {
            window.alert("User not found")
            Login()
        }
        else{
            currentDriver = driverArray[flag]
            console.log(currentDriver)
            greetDriver(currentDriver)
        }
    }

const greetDriver = currentDriver => {


        body.innerHTML = ""
        let nav = document.createElement("nav")
        let navbar_div = document.createElement("div")
        let ul_navbar_left = document.createElement("ul")
        let ul_navbar_right = document.createElement("ul")
        let li_navbar_view = document.createElement("li")
        let li_navbar_create = document.createElement("li")
        let li_navbar_logout = document.createElement("li")
        let a_view = document.createElement("a")
        let a_create = document.createElement("a")
        let a_logout = document.createElement("a")
        navbar_div.className = "nav-wrapper"
        ul_navbar_left.className = "left hide-on-med-and-down"
        ul_navbar_right.className = "right hide-on-med-and-down"
        a_view.innerText = 'View your PickUps'
        a_create.innerText = "Create a new Pickup"
        a_logout.innerText = "Logout"
        a_logout.style.alignContent = "right"
        nav.appendChild(navbar_div)
        navbar_div.appendChild(ul_navbar_left)
        navbar_div.appendChild(ul_navbar_right)
        ul_navbar_left.appendChild(li_navbar_view)
        ul_navbar_left.appendChild(li_navbar_create)
        ul_navbar_right.appendChild(li_navbar_logout)
        li_navbar_view.appendChild(a_view)
        li_navbar_create.appendChild(a_create)
        li_navbar_logout.appendChild(a_logout)


        body.appendChild(nav)

        welcomeDiv = document.createElement('div')
        welcomeMessage = document.createElement('p')
        welcomeMessage.style.textAlign = "center"
        welcomeMessage.innerText = `Hello ${currentDriver.firstname}`
        welcomeDiv.appendChild(welcomeMessage)


        currentPickups = document.createElement('button')
        currentPickups.innerText = 'View your PickUps'
        welcomeDiv.appendChild(currentPickups)

        currentPickups.addEventListener('click', event => {
            event.preventDefault()
            console.log(currentDriver)
            viewUserPickups(currentDriver)
        })

        showMyFlightsList = document.createElement('button')
        showMyFlightsList.innerText = 'Show My Flights List'
        welcomeDiv.appendChild(showMyFlightsList)

        showMyFlightsList.addEventListener('click', event => {
                event.preventDefault()
                console.log('i was clicked')
                flightsList(currentDriver)
        })

        createNewPickup = document.createElement('button')
        createNewPickup.innerText = 'Create new Pickup'
        welcomeDiv.appendChild(createNewPickup)

        createNewPickup.addEventListener('click', event => {
            event.preventDefault()
            console.log(currentDriver)
            getPickUpInfo(currentDriver)
        })

        li_navbar_view.addEventListener('click', event => {
            viewUserPickups(currentDriver)
        })

        li_navbar_create.addEventListener('click', event => {
            event.preventDefault()
            //
            getPickUpInfo(currentDriver)
        })

        li_navbar_logout.addEventListener("click", event =>{
            event.preventDefault()
            Logout(currentDriver)
        })

     body.appendChild(welcomeDiv)
}

const viewUserPickups = currentDriver => {

        fetch(`${DRIVERS_URL}/${currentDriver.id}`)
        .then(response => response.json())
        .then(driverInfo => showPickups(driverInfo))
    }

const showPickups = driverInfo => {

        body.innerHTML = ""

        const showAllPickipDiv = document.createElement('div')

        const pickupList = document.createElement('div')
        individualPickupDiv = document.createElement('ul')
        let i = 0;
        driverInfo.pickups.forEach(pickup => {
            liItem = document.createElement('li')
            liItem.id = ++i
            liItem.innerText = pickup.passenger_name
            individualPickupDiv.appendChild(liItem)

            // let pickupResolved = document.createElement('button')
            // pickupResolved.innerText = 'pickUp made'

            // individualPickupDiv.appendChild(pickupResolved)

            pickupList.appendChild(individualPickupDiv)

            // pickupResolved.addEventListener('click', event => {
            //     console.log('click')
            //     event.preventDefault()
            //     resolveThisPickup(pickup, liItem)
            // })
        })


        const return_button = document.createElement('button')
        return_button.innerText = 'return to Pickup Profile'
        pickupList.appendChild(return_button)

        return_button.addEventListener('click', event => {
            console.log('click')
            greetDriver(currentDriver)
        })

        showAllPickipDiv.appendChild(pickupList)

        body.appendChild(showAllPickipDiv)
        console.log(driverInfo)
    }

    // const resolveThisPickup = (pickupInfo, liItem) => {

    //     console.log(pickupInfo)
    //

    //     liItem.remove()



    //     fetch(`${PICKUPS_URL}/${pickupInfo.id}`, {
    //         method: 'DELETE'
    //     })
    //     .then(console.log('pickUp resolved'))
    // }



    const getPickUpInfo = driverData => {


        currentDriver = driverData

        body.innerHTML = ""

        const newPickupDiv = document.createElement('div')

        const newPickUpForm = document.createElement('form')
        newPickUpForm.id = 'new-pickup-form'

        const passenegerNameInput = document.createElement('input')
        passenegerNameInput.placeholder = 'Passenger name'
        passenegerNameInput.name = 'passengerName'
        newPickUpForm.appendChild(passenegerNameInput)

        const flightNumber = document.createElement('input')
        flightNumber.placeholder = 'Flight Number'
        flightNumber.name = 'flightNumber'
        newPickUpForm.appendChild(flightNumber)

        const arrivalAirport = document.createElement('select')
        arrivalAirport.id = 'airport-drop-down'
        arrivalAirport.name = 'airport'

        const heathrow = document.createElement('option')
        heathrow.innerText = 'Heathrow'
        heathrow.value = 'LHR'
        arrivalAirport.appendChild(heathrow)

        const gatwick = document.createElement('option')
        gatwick.innerText = 'Gatwick'
        gatwick.value = 'LGW'
        arrivalAirport.appendChild(gatwick)

        const londonStansted = document.createElement('option')
        londonStansted.innerText = 'London Stansted'
        londonStansted.value = 'STN'
        arrivalAirport.appendChild(londonStansted)

        const londonCity = document.createElement('option')
        londonCity.innerText = 'London City'
        londonCity.value = 'LCY'
        arrivalAirport.appendChild(londonCity)

        const pickupSubmit = document.createElement('input')
        pickupSubmit.type = 'submit'
        arrivalAirport.appendChild(pickupSubmit)
        button = document.createElement("button")

        newPickUpForm.appendChild(arrivalAirport)


        newPickupDiv.appendChild(newPickUpForm)
        body.appendChild(newPickupDiv)



        newPickUpForm.addEventListener('submit', event => {

            event.preventDefault()


            const passengerName = event.target.elements.passengerName.value
            const flightNumber = event.target.elements.flightNumber.value
            const driver = driverData.id
            const selectedAirport = document.querySelector('#airport-drop-down')
            const airport = selectedAirport.selectedIndex + 1 ;
            const airportCode = event.target.elements.airport.value

            console.log(airport)


            console.log('submit')

            const pickUpData = ({passenger_name: passengerName, flight_number: flightNumber, driver_id: driver, airport_id: airport})

            createPickup(pickUpData)

            showPickUpInfo(airportCode, flightNumber)
    })
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
        .then(data => console.log(data))
    }

    const showPickUpInfo = (airportCode, flightNumber) => {

        fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${airportCode}&type=arrival`)
         .then(response => response.json())
         .then(data => findFlight(data, flightNumber))
    }

    const findFlight = (flightData, flightNumber) => {

        console.log(flightData)

           console.log(flightNumber)
           const new_array = []
           let status;
           let airline;

           for(let i=0;i < flightData.length;i++)
           {
               if(flightData[i].flight.iataNumber === flightNumber)
               {
                   status = flightData[i].status
                   new_array.push(flightData[i].arrival)
                   new_array.push(flightData[i].airline)
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
        evaluateHour(array_of_hours,our_flight_hour_for_compare)

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

         let dayAverage = array_of_hours.length /18

         let flightsThisHour = counter/dayAverage

         let percentageFlightsThisHour = flightsThisHour * 100

         console.log(percentageFlightsThisHour)

         //



         addWaitingTime(percentageFlightsThisHour)
     }


    const addWaitingTime = percentageFlightsThisHour => {

        let waitingTimeDiv = document.createElement('div')
        const waitingTime = document.createElement('p')

        waitingTimeDiv.innerHTML = " "



        if(percentageFlightsThisHour > 200){
            waitingTimeDiv.innerHTML = ""
            waitingTime.innerText = 'Due to extremely high volume of flights arriving at this hour we would suggest leaving 1:30 hrs to clear security and arrivals'
            waitingTimeDiv.appendChild(waitingTime)
        } else if (percentageFlightsThisHour > 150) {
            waitingTimeDiv.innerHTML = ""
            waitingTime.innerText = 'Due to high volume of flights arriving at this hour we would suggest leaving 1 hour to clear security and arrivals'
            waitingTimeDiv.appendChild(waitingTime)
        } else if (percentageFlightsThisHour > 100) {
            waitingTimeDiv.innerHTML = ""
            waitingTime.innerText = 'Due to average volume of flights arriving at this hour we would suggest leaving 45 minutes to clear security and arrivals'
            waitingTimeDiv.appendChild(waitingTime)
        } else {
            waitingTimeDiv.innerHTML = ""
            waitingTime.innerText = 'Due to low volume of flights arriving at this hour we would suggest leaving 30 minutes to clear security and arrivals'
            waitingTimeDiv.appendChild(waitingTime)
        }


        addedWaitTimeDiv.appendChild(waitingTimeDiv)

    }


    const estimatedTime = (new_array,status) => {

        console.log(status)
        body.innerHTML = ""
        estimatedTimeDiv = document.createElement("div")


        let d = new Date(new_array[0].estimatedTime)
        let l = new Date(new_array[0].scheduledTime)

        let terminal = new_array[0].terminal
        let arrivalAirport = new_array[0].iataCode

        let airlineName = new_array[1].name

        const landing_time = d.toLocaleTimeString('en-UK')
        const scheduled_landing_time = l.toLocaleTimeString('en-UK')



        if(status === "landed"){
            estimatedTimeDiv.innerText = `Your flight has landed at ${arrivalAirport} Terminal ${terminal} at: ${landing_time}`
        }
        else if(status === "active"){
            estimatedTimeDiv.innerText = `Your flight is due to land at ${arrivalAirport} Terminal ${terminal} at: ${landing_time}`
        }
        else if(status === "diverted"){
            estimatedTimeDiv.innerText = `Unfortunately your flight has been diverted. Please check with ${airlineName} for more details`
        }
        else if(status === "cancelled"){
            estimatedTimeDiv.innerText = `Unfortunately your flight has been cancelled. Please check with ${airlineName} for more details`
        }
        else{
            estimatedTimeDiv.innerText = `Your flight is due to land at ${arrivalAirport} Terminal ${terminal} at: ${scheduled_landing_time}`
        }




        const estimated_time_return_button = document.createElement('button')
        estimated_time_return_button.innerText = 'return to Pickup Profile'
        estimatedTimeDiv.appendChild(estimated_time_return_button)


        estimatedTimeDiv.appendChild(addedWaitTimeDiv)

        estimated_time_return_button.addEventListener('click', event => {



            event.preventDefault()
            console.log('click')
            greetDriver(currentDriver)

    })

        // addedWaitTimeDiv.appendChild(estimatedTimeDiv)

        body.appendChild(estimatedTimeDiv)
        body.appendChild(addedWaitTimeDiv)

    }






// BUSINESS FEATURE

const flightCardDiv = document.querySelector('#flight-card-div')
flightCardDiv.className = "timetable"

const flightsList = currentDriver => {

    body.innerHTML = " "
    flightCardDiv.innerHTML = " "

    const flightListDiv = document.createElement('div')
    const flightListTitle = document.createElement('h1')
    flightListTitle.className = "hee"
    const flightNumberOnlyForm = document.createElement('form')

    flightListTitle.innerHTML = 'Flight Manager'
    flightNumberOnlyForm.id = 'flight-number-form'

    flightListDiv.appendChild(flightListTitle)
    flightListDiv.appendChild(flightNumberOnlyForm)

    // console.log(currentDriver)
    flightNumberOnlyForm.innerHTML =
    `<input type="text" name="paxName" value="" placeholder="Passenger Name" class="input-text">
    <br>
    <input type="text" name="flightNumberOnly" value="" placeholder="Enter Flight Number" class="input-text">
    <br>
    <input type="submit" name="submit" value="+" class="btn-floating btn-large waves-effect waves-light red" class="medium material-icons">`

// class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i>
// <input type="submit" name="submit" value="Add To Flight Watcher" class="btn-floating btn-large waves-effect waves-light red" class="medium material-icons" >

    const showFlightsDiv = document.createElement('div')
    const showMyFlightsButton = document.createElement("button")
    showMyFlightsButton.className ="btn waves-effect waves-light"
    showMyFlightsButton.innerHTML = "<i class='material-icons right'>Show My Landings</i>"
    showMyFlightsButton.style = "margin-top: 7px"
    // showMyFlightsButton.innerHTML = "Show My Flights"

    flightListDiv.appendChild(showFlightsDiv)
    showFlightsDiv.appendChild(showMyFlightsButton)


    showMyFlightsButton.addEventListener("click", function(e){
    flightCardDiv.innerHTML = ""
    showCurrentFlights()

    showMyFlightsButton.innerHTML = "<i class='material-icons right'>Refresh Landing Times</i>"
    })

    flightListDiv.appendChild(fullFlightListDiv)



    flightNumberOnlyForm.addEventListener('submit', function(e){
        e.preventDefault()
        console.log('submit')

        //
        const passengerName = e.target.elements.paxName.value
        const flightNumberOnly = e.target.elements.flightNumberOnly.value.toUpperCase()
        const driver = currentDriver.id

        const megaFlightsArray = allLondonFlightsToday.flat()
        getInfoUsingFlightNumber(megaFlightsArray, flightNumberOnly, passengerName)

    })



    const flight_list_return_button = document.createElement('button')
    flight_list_return_button.className ="btn waves-effect waves-light"
    flight_list_return_button.innerHTML = "<i class='material-icons right'>Back</i>"
    flight_list_return_button.style = "margin-top: 7px"
        // flight_list_return_button.innerText = 'Back'
        flightListDiv.appendChild(flight_list_return_button)

        flight_list_return_button.addEventListener('click', event => {
            console.log('click')
            greetDriver(currentDriver)
        })

    body.appendChild(flightListDiv)

    body.appendChild(flightCardDiv)
}





const array = []
const gArray = []
const sArray = []
const cArray = []
const lArray = []
const allLondonFlightsToday = []




function showCurrentFlights(){
  flightCardDiv.innerHTML = ""
  const table = document.createElement("table")
  table.className = "highlight"
  flightCardDiv.appendChild(table)

  table.innerHTML = `
    <tbody id="tbody">
      <thead>
        <tr>
            <th>Flight Number</th>
            <th>Status</th>
            <th>Time</th>
            <th>Airport</th>
            <th>Terminal</th>
            <th>Passenger Name</th>
            <th>Delete Landing</th>
        </tr>
      </thead>
    </tbody>
  `

    // return table
  const megaFlightsArray = allLondonFlightsToday.flat()
  const freshFlightData = []

  fetch(BUSINESS_PICKUPS_URL)
    .then(resp => resp.json())
    .then(savedLandings => {
      const myLandings = savedLandings.filter(function(landing) {
        return landing.driver_id === currentDriver.id })

          myLandings.forEach(function(landing){

            megaFlightsArray.forEach(function(flight){
              if ((landing.flight_number === flight.flight.icaoNumber) || (landing.flight_number === flight.flight.iataNumber) ){
                  console.log(flight)
                  renderLanding(flight, landing, table)
                }

            })
          })
        })

}



function renderLanding(flight, landing, table){

  let e = new Date(flight.arrival.estimatedTime)
  let s = new Date(flight.arrival.scheduledTime)
  const estimatedLandingTime = e.toLocaleTimeString('en-UK')
  const scheduledLandingTime = s.toLocaleTimeString('en-UK')

  // function createNewRowForSavedBookings(){
    // const table = document.getElementById("flights-table")
    const newRow = document.createElement("tr")
    // newRow.id = "newRow"
    const flightNumberSpan = document.createElement("td")
    const statusSpan = document.createElement("td")
    const timeSpan = document.createElement("td")
    const airportSpan = document.createElement("td")
    const terminalSpan = document.createElement("td")
    const passengerSpan = document.createElement("td")
    const button = document.createElement("button")
    button.className ="btn waves-effect waves-light"
    button.innerHTML = "<i class='material-icons'>Delete Landing</i>"
    button.style = "margin-top: 7px"


  if(flight.status === "landed"){
      timeSpan.innerHTML = `Landed: ${estimatedLandingTime} `
  }
  else if(flight.status === "active"){
      timeSpan.innerHTML = `Estimated: ${estimatedLandingTime} `
  }
  else{
      timeSpan.innerHTML = `Scheduled: ${scheduledLandingTime} `
  }

  statusSpan.innerHTML = `${flight.status} `
  airportSpan.innerHTML = `${landing.airport.name}  `

  terminalSpan.innerHTML = `${flight.arrival.terminal} `
  passengerSpan.innerHTML = `${landing.passenger_name} `

  if (landing.flight_number.substring(0,3).toUpperCase() === "EZY"){
    flightNumberSpan.innerHTML = `${flight.flight.icaoNumber} `
  } else {
    flightNumberSpan.innerHTML = `${flight.flight.iataNumber} `
}

  // button.innerHTML = "Delete Landing"

  flightCardDiv.append(table)
  table.appendChild(newRow)
  newRow.append(flightNumberSpan, statusSpan, timeSpan, airportSpan, terminalSpan, passengerSpan, button)

  button.addEventListener("click", function(e){
    fetch(`${BUSINESS_PICKUPS_URL}/${landing.id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(() => newRow.remove())
  })
  // return flightCardDiv

}

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
          fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=LTN&type=arrival`)
          .then(response => response.json())
          .then(arr => arr.forEach(function(e){
            cArray.push(e)
          }))
        }
      function lutonFlights(){
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
        lutonFlights()
        allLondonFlightsToday.push(array, gArray, sArray, cArray, lArray)

      }
        makeMainFlights()


    function getInfoUsingFlightNumber(flightArray, flightNumber, passengerName){
      //
      console.log(flightArray)
      flightCardDiv.innerHTML = ""
      const table = document.createElement("table")
      table.className = "highlight"
      flightCardDiv.appendChild(table)

      table.innerHTML = `
        <tbody id="tbody">
          <thead>
            <tr>
                <th>Flight Number</th>
                <th>Status</th>
                <th>Time</th>
                <th>Airport</th>
                <th>Terminal</th>
                <th>Passenger Name</th>
                <th>Delete Landing</th>
            </tr>
          </thead>
        </tbody>
      `

      if (flightNumber.substring(0,3).toUpperCase() === "EZY") {

        for (let i=0; i<flightArray.length; i++){

        			if (flightArray[i].flight.icaoNumber === flightNumber){

                console.log(flightArray[i], ", found it, lets set our flight details up!")

        				//do loads of things with the matched flight number or icaoNumber
                //variables are set according to ezy being on icao
                const flightNumberMatched = flightArray[i].flight.icaoNumber
                const status = flightArray[i].status
                const estimatedTime = flightArray[i].arrival.estimatedTime
                const scheduledTime = flightArray[i].arrival.scheduledTime
                const airport = flightArray[i].arrival.iataCode
                const terminal = flightArray[i].arrival.terminal

                console.log(flightNumber, status, airport, terminal, passengerName, table)

                let d = new Date(estimatedTime)
                let l = new Date(scheduledTime)

                const estimatedLandingTime = d.toLocaleTimeString('en-UK')
                const scheduledLandingTime = l.toLocaleTimeString('en-UK')

                makeLandingCard(flightNumber, status, scheduledLandingTime, airport, terminal, passengerName, table)
              }
        		}


        	} else {


        for (let i=0; i < flightArray.length; i++){


                      if (flightArray[i].flight.iataNumber === flightNumber){
                          console.log(flightArray[i], ", found it, lets set our flight details up!")
                          const flightNumberMatched = flightArray[i].flight.iataNumber
                          const status = flightArray[i].status
                          const estimatedTime = flightArray[i].arrival.estimatedTime
                          const scheduledTime = flightArray[i].arrival.scheduledTime
                          const airport = flightArray[i].arrival.iataCode
                          const terminal = flightArray[i].arrival.terminal

                          console.log(flightNumber, status, airport, terminal, passengerName, table)

                          let d = new Date(estimatedTime)
                          let l = new Date(scheduledTime)
                          const estimatedLandingTime = d.toLocaleTimeString('en-UK')
                          const scheduledLandingTime = l.toLocaleTimeString('en-UK')

                          makeLandingCard(flightNumber, status, scheduledLandingTime, airport, terminal, passengerName, table)
                    }
                      console.log("no match")
              }
            }
          }




  function renderLandingTable(){
      flightCardDiv.innerHTML = ""
      const table = document.createElement("table")
      table.className = "highlight"
      flightCardDiv.appendChild(table)

      table.innerHTML = `
        <tbody id="tbody">
          <thead>
            <tr>
                <th>Flight Number</th>
                <th>Status</th>
                <th>Time</th>
                <th>Airport</th>
                <th>Terminal</th>
                <th>Passenger Name</th>
                <th>Delete Landing</th>
            </tr>
          </thead>
        </tbody>
      `

        return table
        //
    }

    function makeLandingCard(flightNumber, status, time, code, terminal, passenger_name, table){


      const newRow = document.createElement("tr")
      newRow.id = "newRow"
      const flightNumberSpan = document.createElement("td")
      const statusSpan = document.createElement("td")
      const timeSpan = document.createElement("td")
      const airportSpan = document.createElement("td")
      const terminalSpan = document.createElement("td")
      const passengerSpan = document.createElement("td")
      const button = document.createElement("button")
      button.className ="btn waves-effect waves-light"
      button.innerHTML = "Submit<i class='material-icons right'>send</i>"
      button.style = "margin-top: 7px"
      // button.setAttribute = `<a class="waves-effect waves-light btn-small"><i class="material-icons left">cloud</i>button</a>'

      flightNumberSpan.innerHTML = `${flightNumber}`
      statusSpan.innerHTML = `${status}`
      timeSpan.innerHTML = `${time}`
      airportSpan.innerHTML = `${code}`
      terminalSpan.innerHTML = `${terminal}`
      passengerSpan.innerHTML = `${passenger_name}`
      button.innerHTML = "Delete Landing"

      flightCardDiv.append(table)
      table.appendChild(newRow)
      newRow.append(flightNumberSpan, statusSpan, timeSpan, airportSpan, terminalSpan, passengerSpan, button)

      createLanding({flight_number: flightNumber, status: status, time: time, code: code, terminal: terminal, passenger_name: passenger_name, driver_id: currentDriver.id}, button, newRow)
      return flightCardDiv


}

    function createLanding(landingData, button, newRow){

        //

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
          .then(() => newRow.remove())
          // render landing to page
        })
      })
}
