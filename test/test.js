const fs = require("fs")
const {mergeMetaData} = require("../utils/utils")


// let example = [
//     {
//         uid: 'QavAXu40u6OYJzqfitLVBZ9VqGU2',
//         email: 'prima1700016114@webmail.uad.ac.id',
//         emailVerified: false,
//         displayName: 'Prima Abdi Persada',
//         photoURL: undefined,
//         phoneNumber: undefined,
//         disabled: false,
//     },
//     {
//         uid: 'QavAXu40u6OYJzqfitLVBZ9VqGU2',
//         email: 'prima1700016114@webmail.uad.ac.id',
//         emailVerified: false,
//         displayName: 'Prima Abdi Persada',
//         photoURL: undefined,
//         phoneNumber: undefined,
//         disabled: false,
//     },
// ]

// let data = example.map((value) => {
//     if (value.photoURL === undefined) {
//         value.photoURL = "kosong"
//     } 
//     return value
    
// })

// fs.writeFileSync("./test.json", JSON.stringify(data))

// let a = {"data":undefined, "isValid":"false"}

// console.log(Object.getOwnPropertyNames(a))


// for (const b in a) {
//    if (a[b] === undefined) {
//     a[b] = "ada"
//    }
//    console.log(a)
// }

const exampleObject = {
    uid: 'mPmdxlNsO4NiGQ1NMA8pYNkk4jy1',
  email: 'nurul99@gmail.com',
  emailVerified: false,
  displayName: 'Nurul Ishmah',
  photoURL: undefined,
  phoneNumber: undefined,
  disabled: false,
  metadata: {
    creationTime: 'Mon, 16 Mar 2020 08:20:33 GMT',
    lastSignInTime: 'Mon, 16 Mar 2020 08:20:33 GMT',
    lastRefreshTime: 'Mon, 16 Mar 2020 08:20:33 GMT'
  },
  providerData: [ {
      uid: 'nurul99@gmail.com',
      displayName: 'Nurul Ishmah',
      email: 'nurul99@gmail.com',
      photoURL: undefined,
      providerId: 'password',
      phoneNumber: undefined
    }
  ],
  passwordHash: undefined,
  passwordSalt: undefined,
  tokensValidAfterTime: 'Mon, 16 Mar 2020 08:20:33 GMT',
  tenantId: undefined
  }


function merger(obj) {
    const {metadata, ...data} = obj
    let temp = Object.assign({})
    Object.assign(temp, obj.metadata)
    Object.assign(temp, data)
    console.log(temp)
}
// merger(exampleObject)

let d = mergeMetaData(exampleObject)
console.log(d)