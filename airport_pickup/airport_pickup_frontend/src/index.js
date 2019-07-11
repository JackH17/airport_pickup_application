const body = document.body
let currentDriver;
let navbar = document.querySelector(".nav-wrapper")
let background_img = document.querySelector("#bg")

const DRIVERS_URL = 'http://localhost:3000/drivers'
const AIRPORTS_URL = 'http://localhost:3000/airports'
const PICKUPS_URL = 'http://localhost:3000/pickups'

const apiKey = 'e5afcd-79f8bd'

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
    .then(data => greetNewDriver(data))
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
    ul_navbar_right.appendChild(li_navbar_logout)
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
        welcomeMessage.innerText = `Welcome Back ${currentDriver.firstname}`
        welcomeDiv.appendChild(welcomeMessage)

        
        // currentPickups = document.createElement('p')
        // currentPickups.innerText = 'View your PickUps'
        // welcomeDiv.appendChild(currentPickups)
        li_navbar_view.addEventListener('click', event => {
            viewUserPickups(currentDriver)
        })

        

        // createNewPickup = document.createElement('p')
        // createNewPickup.innerText = 'Create new Pickup'
        // welcomeDiv.appendChild(createNewPickup)
        li_navbar_create.addEventListener('click', event => {
            event.preventDefault()
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

        const pickupList = document.createElement('ul')

        driverInfo.pickups.forEach(pickup => {
            liItem = document.createElement('li')
            liItem.innerText = pickup.passenger_name 
            pickupList.appendChild(liItem)

            let pickupResolved = document.createElement('button')
            pickupResolved.innerText = 'pickUp made'
            pickupList.appendChild(pickupResolved)

            pickupResolved.addEventListener('click', event => {
                console.log('click')
                resolveThisPickup(pickup, liItem)
            }) 
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

    const resolveThisPickup = (pickupInfo, liItem) => {

        console.log(liItem)
    }



    const getPickUpInfo = driverData => {
  
     
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

        // let newPickUpDiv = document.createElement("div")
        // let viewPickupDiv = document.createElement("div")

        // viewPickUpDiv.innerText = 'view all pickups'
        // newPickupDiv.innerText = 'create new pickup'

        // div.appendChild(viewPickUpDiv)
        // div.appendChild(newPickUpDiv)

        // viewPickUpDiv.addEventListener('click', event => {
        //     event.preventDefault()
        //     console.log('i was clicked')
        //     viewUserPickups(currentDriver)
        // })

        // newPickupDiv.addEventListener('click', event => {
        //     event.preventDefault()
        //     getPickUpInfo(currentDriver)
        // })



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


        const estimated_time_return_button = document.createElement('button')
        estimated_time_return_button.innerText = 'return to Pickup Profile'
        div.appendChild(estimated_time_return_button)

        estimated_time_return_button.addEventListener('click', event => {
            console.log('click')
            greetDriver(currentDriver)
        })


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

   