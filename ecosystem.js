const ECOSYSTEM = {}

const CONTENT = {}
CONTENT.eat = "Aku makan"
CONTENT.eaten = "Aku dimakan"

ECOSYSTEM.ecosystem = [
  {
    id: 1,
    name: "lion"
  },
  {
    id: 2,
    name: "cow"
  },
  {
    id: 3,
    name: "grass"
  }
]
ECOSYSTEM.feedCounter = 1
ECOSYSTEM.feeds = []
ECOSYSTEM.relations = [
  {
    predator: 1,
    food: 2
  },
  {
    predator: 2,
    food: 3
  },
  {
    predator: 3,
    food: 1
  }
]

ECOSYSTEM.getEcosystem = (req, res) => {
  res.send({
    data: ECOSYSTEM.ecosystem
  })
}

ECOSYSTEM.tweat = (req, res) => {
  let body = req.body
  let params = req.params

  let validate = ECOSYSTEM.ecosystem.find(elm => elm.predator === Number(params.species_id) && elm.food === Number(body.target_id))

  if (validate) {
    return res.send({
      success: false
    })
  }

  ECOSYSTEM.feeds.push({
    id: ECOSYSTEM.feedCounter,
    content: `${CONTENT.eat} @${body.target_id}`,
    time: Math.floor(Date.now() / 1000),
    reference_id: 0,
    species_id: Number(params.species_id)
  })
  let temporary = ECOSYSTEM.feedCounter
  ECOSYSTEM.feedCounter++

  ECOSYSTEM.feeds.push({
    id: ECOSYSTEM.feedCounter,
    content: `${CONTENT.eaten} @${params.species_id}`,
    time: Math.floor(Date.now() / 1000),
    reference_id: temporary,
    species_id: Number(body.target_id)
  })
  ECOSYSTEM.feedCounter++

  res.send({
    success: true
  })
}

ECOSYSTEM.home = (req, res) => {
  res.send({
    data: ECOSYSTEM.feeds
  })
}

ECOSYSTEM.getProfile = (req, res) => {
  let params = req.params
  let profile = ECOSYSTEM.ecosystem.find(elm => elm.id === Number(params.id))
  let data = {...profile}

  personFeeds = ECOSYSTEM.feeds.filter(elm => elm.species_id === Number(params.id))

  data.feeds = personFeeds
  res.send(data)
}

ECOSYSTEM.reply = (req, res) => {
  let params = req.params
  let body = req.body

  ECOSYSTEM.feeds.push({
    id: ECOSYSTEM.feedCounter,
    content: body.content,
    time: Math.floor(Date.now() / 1000),
    reference_id: Number(params.feed_id),
    species_id: Number(params.species_id)
  })
  ECOSYSTEM.feedCounter++

  res.send({
    success: true
  })
}

ECOSYSTEM.getFeed = (req, res) => {
  let params = req.params
  let feed = ECOSYSTEM.feeds.find(elm => elm.id === Number(params.id))
  let replies = ECOSYSTEM.feeds.filter(elm => elm.reference_id === Number(params.id))

  res.send({
    data: {
      ...feed,
      replies
    }
  })
}

module.exports = ECOSYSTEM