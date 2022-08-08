// /* eslint-disable indent */
// /* eslint-disable no-empty */
// import { NextFunction, Request, Response } from "express"
// import db from "../../src/db/connection"
// import { ROW_TYPE, UserStateInterface } from "./user.model"

// const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
//   // Check if this user exists
//   // IF exists login to his account
//   // return state
//   try {
//     const sql_find = "SELECT * FROM users WHERE email = (?)"
//     const { email } = req.body

//     db.all(sql_find, [email], (err: any, rows: Array<ROW_TYPE>) => {
//       if (err) return console.error(err)
//       if (rows.length === 1) {
//         const {
//           first_name,
//           last_name,
//           email,
//           liked,
//           applied,
//           interview,
//           accepted,
//           rejected,
//         } = rows[0]

//         const state: UserStateInterface = {
//           isLoggedIn: true,
//           user: {
//             firstName: first_name,
//             lastName: last_name,
//             email: email,
//           },
//           savedJobs: {
//             likedJobs: liked,
//             appliedJobs: applied,
//             interviewJobs: interview,
//             acceptedJobs: accepted,
//             rejectedJobs: rejected,
//           },
//         }

//         res.status(200).send({ message: "Success", user: state })
//       }

//       if (rows.length === 0) {
//           next()
//       }
//     })
//   } catch (error) {}
// }

// const googleSignUp = async (res: Response, req: Request) => {
//     // IF does not exist, create account for the user
//     // LEAVE password field blank
//     // return state
//     try {
//         const sql_insert = "INSERT INTO users(first_name, last_name, email, password) VALUES(?,?,?,?)"
// 		const { first_name, last_name, email } =  req.body 

// 		db.run(sql_insert,[first_name, last_name, email, ""], (err: any) => {
// 			if (err) return console.error(err)
// 			console.log("a new row has been created")
// 		})

//         const state: UserStateInterface = {
//             isLoggedIn: true,
//             user: {
//               firstName: first_name,
//               lastName: last_name,
//               email: email,
//             },
//             savedJobs: {
//               likedJobs: [],
//               appliedJobs: [],
//               interviewJobs: [],
//               acceptedJobs: [],
//               rejectedJobs: [],
//             },
//           }

// 		res
// 			.status(200)
// 			.send({ message: "Success", user: state })
//     } catch (error) {
//         console.log(error)
//     }
// }

// export { googleLogin, googleSignUp }
