const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const ecosystem = require("./ecosystem")
const PORT = 8080

app.use(cors())
app.use(bodyParser.json())
// get ecosystem
app.get('/ecosystem', ecosystem.getEcosystem)
// post tweat
app.post('/ecosystem/:species_id/feeds', ecosystem.tweat)
// get home feeds
app.get('/ecosystem/feeds', ecosystem.home)
// get profile
app.get('/ecosystem/:id', ecosystem.getProfile)
// post reply
app.post('/ecosystem/:species_id/:feed_id/reply', ecosystem.reply)
// get detail feed
app.get('/ecosystem/feeds/:id', ecosystem.getFeed)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})