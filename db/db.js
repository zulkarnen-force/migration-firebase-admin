const mongoose = require('mongoose');

async function getDB() {
  
    try {
        let db = await mongoose.connect('mongodb://localhost:27017/test');
        return db
      } catch (err) {
        console.log(err)
        return err
      }

}

module.exports = { getDB }