const body = document.body
let currentDriver;

const DRIVERS_URL = 'http://localhost:3000/drivers'
const AIRPORTS_URL = 'http://localhost:3000/airports'
const PICKUPS_URL = 'http://localhost:3000/pickups'

const apiKey = 'e5afcd-79f8bd'




document.addEventListener('DOMContentLoaded', (event) => {
    mainPage();
})

const mainPage = () =>{
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

const createNewDriver = newDriverData => {
    return fetch(DRIVERS_URL, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
        body: JSON.stringify(newDriverData)
    }).then(response => response.json())
    .then(data => greetNewDriver(data))
}



const greetNewDriver = (driver) => {

    body.innerHTML = ""
    let currentDriver = driver;
    debugger
    newDriverWelcomeDiv = document.createElement('div')

    newDriverWelcomeMessage = document.createElement('p')
    newDriverWelcomeMessage.innerText = `Welcome ${currentDriver.firstname}`
    newDriverWelcomeDiv.appendChild(newDriverWelcomeMessage)

    newDriverNewPickups = document.createElement('p')
    newDriverNewPickups.innerText = `Make your first Pickup`
    newDriverWelcomeDiv.appendChild(newDriverNewPickups)

    newDriverNewPickups.addEventListener('click', event => {
        event.preventDefault()
        getPickUpInfo(currentDriver);

    })

    body.appendChild(newDriverWelcomeDiv)

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
        welcomeDiv = document.createElement('div')
        welcomeMessage = document.createElement('p')
        welcomeMessage.innerText = `Welcome Back ${currentDriver.firstname}`
        welcomeDiv.appendChild(welcomeMessage)


        currentPickups = document.createElement('p')
        currentPickups.innerText = 'View your PickUps'
        welcomeDiv.appendChild(currentPickups)
        currentPickups.addEventListener('click', event => {
            console.log('i was clicked')
            viewUserPickups(currentDriver)
        })


        createNewPickup = document.createElement('p')
        createNewPickup.innerText = 'Create new Pickup'
        welcomeDiv.appendChild(createNewPickup)
        createNewPickup.addEventListener('click', event => {
            event.preventDefault()
            getPickUpInfo(currentDriver)
            debugger
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

        const pickupList = document.createElement('ul')

        driverInfo.pickups.forEach(pickup => {
            liItem = document.createElement('li')
            liItem.innerText = pickup.passenger_name 
            pickupList.appendChild(liItem)
        })
        div_button.appendChild(return_button)
        body.appendChild(pickupList)
        body.appendChild(return_button)
        
        debugger

        console.log(driverInfo)
    }


 const getPickUpInfo = driverData => {
        debugger
     
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
        debugger
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

    const estimatedTime = (new_array,status) => {

        console.log(status)
        body.innerHTML = ""
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
        
        body.appendChild(div)

    }




    // console.log('hello')


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






    // newDriverForm.addEventListener('submit', event => {

    //     event.preventDefault()

    //     debugger

    //     const driverName = event.target.elements.name.value

    //     createDriver({username: driverName})

    //     console.log('submit')
    // })

   