const body = document.body

document.addEventListener('DOMContentLoaded', (event) => {
    mainPage();
})

const mainPage = () =>{
    body.innerHTML = "";
    const div = document.createElement("div")
    const h3 = document.createElement("h3")
    const login_button = document.createElement("button")
    const signup_option = document.createElement("button")
    div.id = "welcome"
    h3.innerText = "What would you like to do?"
    login_button.id = "login"
    login_button.innerText = "Login"
    signup_option.innerText = "Signup"
    signup_option.id = "signup"
    body.appendChild(div)
    div.appendChild(h3)
    div.appendChild(login_button)
    div.appendChild(signup_option) 
    login_button.addEventListener("click", function(){
        Login();
    })
}

const Login = () => {
    body.innerHTML = ""
    const div = document.createElement("div")
    const sub_div1 = document.createElement("div")
    const sub_div2 = document.createElement("div")
    const username_input = document.createElement("input")
    const password = document.createElement("input")
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
    
    submit_login_button.addEventListener("click", function(){
        fetchDrivers()
    })
}
    

    const fetchDrivers = () =>{
        let driverArray = []
        fetch("http://localhost:3000/drivers",)
        .then(response => response.json())
        .then(drivers => {
            drivers.forEach(driver => { 
                driverArray.push(driver)
            })
        })
        validateLogin(driverArray);
    }

    const validateLogin = (driverArray) =>{

        let username = document.querySelector("#username_input")
        let password = document.querySelector("#password_input")
        username.required = true;
        password.required = true;

        for(let i=0;i < driverArray.length;i++){
            if(driverArray[i].username === username && driverArray[i].password === password)
            {
                console.log("Hello")
            }
            else{
                let h3 = document.createElement("h3")
                h3.innerText = "User not found"
            }
        }

    }


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
