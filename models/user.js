const mongoose = require( 'mongoose');
const { Schema } = mongoose;

// {
//     "uid": "1RprM4oFQfcVL8cvBalZHBktyE02",
//     "email": "habibbaharuddin@gmail.com",
//     "emailVerified": false,
//     "displayName": "Habib Baharuddin Husain",
//     "photoURL": "",
//     "phoneNumber": "",
//     "disabled": false,
//     "metadata": {
//       "lastSignInTime": "Sat, 07 Mar 2020 07:56:35 GMT",
//       "creationTime": "Mon, 24 Feb 2020 07:05:01 GMT",
//       "lastRefreshTime": "Sat, 16 May 2020 16:00:48 GMT"
//     },
//     "passwordHash": "",
//     "passwordSalt": "",
//     "tokensValidAfterTime": "Mon, 24 Feb 2020 07:05:01 GMT",
//     "tenantId": ""
//   },
const userSchema = new Schema({
  uid:  {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique:true
  },
  displayName: String,
  password: {
    type: String,
    required: true,
  },
  phoneNumber:   String,
  emailVerfied: Boolean,
  disabled:   Boolean,
  photoURL:   String,
  lastSignInTime: Date,
  creationTime: Date,
  lastRefreshTime: Date,
  tokensValidAfterTime: Date,
  tenantId: String
});


const User = mongoose.model('User', userSchema);


module.exports = User