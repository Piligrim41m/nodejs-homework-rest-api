const mongoose =require('mongoose')
const app = require('./app')

// const DB_HOST = "mongodb+srv://lightsun41m:DsfzsewFveBasPCY@cluster0.gydekh5.mongodb.net/db-contacts?retryWrites=true&w=majority"
const { DB_HOST } = process.env

mongoose.connect(DB_HOST)
  .then(() => {
    console.log('Database connection sucessful')
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    })
  })
  .catch(err => {
    console.error(err.message);
    process.exit(1);
})
