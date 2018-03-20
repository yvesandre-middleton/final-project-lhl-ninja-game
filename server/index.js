"use strict"

// Basic express setup:

const PORT          = 8080;
const express       = require("express")
const bodyParser    = require("body-parser")
const app           = express()

// Mongo db setup
const {MongoClient} = require("mongodb")
const MONGODB_URI = "mongodb://localhost:27017/leaderboard"

// Connect to mongo db and check for errors
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`)
    throw err;
  }
  console.log(`connected to mongo db: ${MONGODB_URI}`)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))


// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
const DataHelpers = require("./lib/data-helpers.js")(db)

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const scoresRoutes = require("./routes/scores")(DataHelpers)

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/scores", scoresRoutes)

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT)
})
})