const { applicationDefault, initializeApp} = require( 'firebase-admin/app');
const admin = require("firebase-admin")
const fs = require("fs")
const {saveToJsonFile, changeKey} = require('./utils/utils')

const serviceAccount = require("C:/Users/user/Downloads/ruang-ekspresi-config.json");
const { auth } = require('firebase-admin');
const { default: mongoose } = require('mongoose');
const { TIMEOUT } = require('dns');


let app = admin.initializeApp ({
    
  credential: admin.credential.cert(serviceAccount),

  });



//   databaseURL: "https://ruang-ekspresi-v1-0.firebaseio.com"

let db = app.firestore()

async function toJson(collectionNames) {

  for (let collectionName of collectionNames) {
    
    const snapshot = await db.collection(collectionName).get();
    let document = snapshot.docs.map( (doc) => ({ id: doc.id, ...doc.data() }))
    let jsonFormat = JSON.stringify(document)
    fs.writeFileSync(`${collectionName}.json`, jsonFormat); 
  }

}

let collections = ["applicants", "posts",  "progress_cards", "progress_tasks", "projects"]

function getProjectId() {
  let temp = []
  let projects = readToObject("projects.json")
  for (const project of projects) {
    temp.push(project.id)
  }
  return temp
}


async function getGalleries(docID = "") {
  let data = db.collection("projects")
  let doc = data.doc(docId)
  let galleriesCol = doc.collection("galleries")
  let tes = await galleriesCol.get()
  let temp = []
  tes.forEach((doc) => {
    temp.push({...doc.data(), id:doc.id, docRef: docId})
  })
  console.log(temp)
  saveToJsonFile("projects-hiring", temp)

  // tes.docs.
  // console.log(tes.docs.forEach((e) => console.log(e)))

  /// console.log(galleriesCol.forEach((e) => console.log(e.data())))
  // for (const i of galleriesCol) {
  //   console.log(i)
  // }
//   galleries.get().then(snp => {
//     snp.forEach(e => console.log(e.data(), e.id))
//   })
}

let docId = "1577806287429652"
// getGalleries(docId)



// function getUsers() {

//   admin.auth().listUsers().then(data => {
//     let userJsonFormat = JSON.stringify(data.users)
//     fs.writeFileSync(`users.json`, userJsonFormat); 
//   })

// }

// toJson(collections)
// getUsers()


function getCleanedUsers(file) {
  let fl = fs.readFileSync(file, {encoding:"utf-8"})
  let data = JSON.parse(fl)
  let cleaned =  data.map(user => {
  const {metadata, providerData, ...cleaned} = user;
    return Object.assign(cleaned, metadata)
  })

  return cleaned
}



// let userClean = getCleanedUsers('./users.json')

// saveToJsonFile('users_clean.json', userClean)


// function getUserById() {
//   admin.auth().getUser("KsdNfU1ro0gae8FpPUMLGq3w9Sr1").then(data => console.log(data))
// }

// getUserById()

function cleanObject(obj = {}) {
  for (let prop in obj) {
    if(obj[prop] === undefined) {
      obj[prop] = ""
    }
  }
  return obj
}

async function getUsers() {
  let listUsers = (await admin.auth().listUsers()).users
  let usersData = []
  for (let i = 0; i < listUsers.length; i++) {
    let user = listUsers[i];
    let {providerData, ...data} = user
    let cleanData = cleanObject(data)
    usersData.push(cleanData)
  }
  console.log("result", usersData)
  return usersData
}

// getUsers().then(data => saveToJsonFile("user_cleaned_1Nov.json", data))

// let users = getUsers()
// saveToJsonFile("user_cleaned_1Nov.json", users)

// let iter = ["satu", "dua"].()



// listUsers.users.forEach((value) => {
  // fs.writeFileSync("list_users_dong.json", value)
// })
// foo() 

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

// timeAble()

function usersMongoable(o = {}) {
  let obj = o
  delete Object.assign(obj, o.metadata)["metadata"]
  delete o.providerData
  delete o.passwordSalt
  changeKey(obj, "passwordHash", "password")
  o._id = mongoose.Types.ObjectId(o._id)
  return obj
}



function readToObject(filename) {
  let file = fs.readFileSync(`${filename}`, {encoding:"utf-8"})
  return JSON.parse(file)
}

function createCreatedAt(o = {}) {
  const newObject = {};
  delete Object.assign(newObject, o, {["created_at"]: o["timestamp"] })["timestamp"];
  return newObject
}



let simpleObject = {
  id:"ksajdklsajd",
  name:"Zulkarnen",
}

let changedKey = changeKey(simpleObject, "id", "_id")

// console.log(changedKey)
// const f = readToObject('projects')
// console.log(createCreatedAt(f[0]))

// cleanObject(exampleObject) 
let source = {name:"nama"}
// console.log(delete Object.assign(source, {id:"sajdkjasl"}, {_id:"daskljd"})["_id"])

// console.log(source)



function userToMongoable() {
  let cleaned = []
  let users = readToObject("user_cleaned_1Nov.json")
  for (let user of users){
    cleaned.push(usersMongoable(user))
  }
  saveToJsonFile("users_mongoable", cleaned)
}

function jsonMongooAble(filename, datas, format) {
  let cleaned = []
  
  for (let data of datas){
    cleaned.push(format(data))
  }
  saveToJsonFile(filename, cleaned)
}
// userToMongoable()

let cards = {    uid: "ALDeZzRJF3Toeh3x4ee61vU7uRS2",
    taskFinished: 0,
    projectID: "15828710323631421",
    timestamp: {
      _seconds: 1583123949,
      _nanoseconds: 676000000
    },
    asignTo: "Glf1Wm19Z7PVo9gQJ8QuWCJg2em2"}

function cardFormatMongoo(o = {}) {
  let temp = o
  temp.createdAt = new Date(o.timestamp._seconds * 1000)
  delete o.timestamp
  changeKey(temp, "asignTo", "assignTo")
  return temp
}

// console.log(cardFormatMongoo(cards))

function userToMongoable() {
  let cleaned = []
  let cards = readToObject("./progress_cards.json")
  for (let card of cards){
    cleaned.push(cardFormatMongoo(card))
  }
  saveToJsonFile("cards_mongoable", cleaned)
}
// userToMongoable()

let membersExample =     {
  "id": "0MIE1GOL3chVSZkpfi2ZxvyGdcx2",
  "created_at": {
    ".sv": "timestamp"
  },
  "name": "zulfarasa",
  "bio": "o",
  "role": "member"
}


function membersFormatMongoo(o = {}) {
  let temp = o
  // if (typeof temp.created_at._seconds !== "undefined") {
  //   temp.createdAt = new Date(temp.created_at._seconds * 1000)
  // }
  delete temp.created_at
  return temp
}

// let members = readToObject("./members.json")
// jsonMongooAble("members_mongooable", members, membersFormatMongoo)

// console.log(membersFormatMongoo(membersExample))



let exampleProjectData =  {
  "id": "1582699829601934",
  "title": "Video Profile Ruang ekspresi",
  "taskFinished": 0,
  "uid": "pSuedzZxAeX6FCY5DH8zXZ2HH4l2",
  "openHiring": true,
  "taskTotal": 0,
  "description": "Video Profile Ruang ekspresi",
  "members": [
    "pSuedzZxAeX6FCY5DH8zXZ2HH4l2",
    "H2BTEevxFxRWl8lduT3U3O2HR6y2"
  ],
  "dueDate": {
    "_seconds": 1583131800,
    "_nanoseconds": 0
  },
  "timestamp": {
    "_seconds": 1582699830,
    "_nanoseconds": 710000000
  },
  "published": false,
  "cover": "/1582699829601934/1582868023871.png"
}

function projectMongoFormat(o = {}) {
  let temp = o
  temp.dueDate = new Date(o.dueDate._seconds * 1000)
  temp.createdAt = new Date(o.timestamp._seconds * 1000)
  delete temp.timestamp
  return temp
}

function cleandProjectMongoable() {
  let cleaned = []
  let projects = readToObject("./projects.json")
  for (let project of projects){
    cleaned.push(projectMongoFormat(project))
  }
  saveToJsonFile("projects_mongoable", cleaned)
}

cleandProjectMongoable()
