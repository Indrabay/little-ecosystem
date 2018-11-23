const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const ecosystem = require("./ecosystem")

app.use(cors())
app.use(bodyParser.json())
// get ecosystem
app.get('/ecosystem', ecosystem.getEcosystem)
// post tweat
app.post('/ecosystem/:species_id/feeds', ecosystem.tweat)
// get home feeds
app.get('/ecosystem/feeds', ecosystem.home)
// add relation
app.post('/ecosystem/relations', ecosystem.addRelation)
// get relations
app.get('/ecosystem/relations', ecosystem.getRelations)
// get profile
app.get('/ecosystem/:id', ecosystem.getProfile)
// post reply
app.post('/ecosystem/:species_id/:feed_id/reply', ecosystem.reply)
// get detail feed
app.get('/ecosystem/feeds/:id', ecosystem.getFeed)
// add ecosystem
app.post('/ecosystem', ecosystem.addSpecies)
// remove ecosystem
app.delete('/ecosystem/:id', ecosystem.removeSpecies)

module.exports = app