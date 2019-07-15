// if (flightNumber.substring(0,3).toUpperCase() === "EZY"){
// console.log("flight number starts with ezy, lets run the loop for icao stuff")
//
// for (let i=0; i<flightArray.length; i++){
//
// 			if (!flightArray[i].flight.icaoNumber === flightNumber){
//         console.log("no match, on you go!")
//       } else {
// 				//do loads of things with the matched flight number or icaoNumber
//         //variables are set according to ezy being on icao
//         const flightNumberMatched = flightArray[i].flight.icaoNumber
//         const status = flightArray[i].status
//         const estimatedTime = flightArray[i].arrival.estimatedTime
//         const scheduledTime = flightArray[i].arrival.scheduledTime
//         const airport = flightArray[i].arrival.icaoNumber
//         const terminal = flightArray[i].arrival.terminal
//       }
// 		}
// 	} else {
//         // if it don't start with ezy set variables according to old way, then end if else to close
// console.log("flight number dont start with ezy lets set things up the usual way and run that loop")
//
// for (let i=0; i < flightArray.length; i++){
//
//       if (flightArray[i].flight.iataNumber === flightNumber){
//           console.log("found it, lets set our flight details up!")
//         const flightNumberMatched = flightArray[i].flight.iataNumber
//         const status = flightArray[i].status
//         const estimatedTime = flightArray[i].arrival.estimatedTime
//         const scheduledTime = flightArray[i].arrival.scheduledTime
//         const airport = flightArray[i].arrival.iataCode
//         const terminal = flightArray[i].arrival.terminal
//           } else {
//             console.log("nope, checked, this aint it")
//       //return message "error: cannot find flight"
//       }
//     }
//   }

  ////////////////////////////////////////////////////////
// 
// if (flightNumber.substring(0,3).toUpperCase() === "EZY") {
//
//   for (let i=0; i<flightArray.length; i++){
//
//   			if (flightArray[i].flight.icaoNumber === flightNumber){
//           console.log(flightArray[i], ", found it, lets set our flight details up!")
//   				//do loads of things with the matched flight number or icaoNumber
//           //variables are set according to ezy being on icao
//           const flightNumberMatched = flightArray[i].flight.icaoNumber
//           const status = flightArray[i].status
//           const estimatedTime = flightArray[i].arrival.estimatedTime
//           const scheduledTime = flightArray[i].arrival.scheduledTime
//           const airport = flightArray[i].arrival.icaoNumber
//           const terminal = flightArray[i].arrival.terminal
//
//           console.log(flightNumber, status, airport, terminal, passengerName, table)
//           debugger
//           let d = new Date(estimatedTime)
//           let l = new Date(scheduledTime)
//
//           const estimatedLandingTime = d.toLocaleTimeString('en-UK')
//           const scheduledLandingTime = l.toLocaleTimeString('en-UK')
//
//           makeLandingCard(flightNumber, status, scheduledLandingTime, airport, terminal, passengerName, table)
//         }
//   		}
//
//
//   	} else {
//
//
//   for (let i=0; i < flightArray.length; i++){
//
//
//                 if (flightArray[i].flight.iataNumber === flightNumber){
//                     console.log(flightArray[i], ", found it, lets set our flight details up!")
//                     const flightNumberMatched = flightArray[i].flight.iataNumber
//                     const status = flightArray[i].status
//                     const estimatedTime = flightArray[i].arrival.estimatedTime
//                     const scheduledTime = flightArray[i].arrival.scheduledTime
//                     const airport = flightArray[i].arrival.iataCode
//                     const terminal = flightArray[i].arrival.terminal
//
//                     console.log(flightNumber, status, airport, terminal, passengerName, table)
//                     debugger
//                     let d = new Date(estimatedTime)
//                     let l = new Date(scheduledTime)
//                     const estimatedLandingTime = d.toLocaleTimeString('en-UK')
//                     const scheduledLandingTime = l.toLocaleTimeString('en-UK')
//
//                     makeLandingCard(flightNumber, status, scheduledLandingTime, airport, terminal, passengerName, table)
//                 }
//               }
//
//       }
