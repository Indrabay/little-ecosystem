const ecosystem = require("../ecosystem")

describe("Check property", () => {
  it("Check getEcosystem property to have data", () => {
    const send = jest.fn()
    const res = {
      send
    }

    ecosystem.getEcosystem({}, res)
    expect(send.mock.calls[0][0]).toHaveProperty('data')
  })

  it("Check getEcosystem data element to have id and name propery", () => {
    const send = jest.fn()
    const res = {
      send
    }

    ecosystem.getEcosystem({}, res)
    expect(send.mock.calls[0][0].data[0]).toHaveProperty('id')
    expect(send.mock.calls[0][0].data[0]).toHaveProperty('name')
  })

  it("Check tweat return with property success", () => {
    const send = jest.fn()
    const req = {
      body: {
        target_id: 2
      },
      params: {
        species_id: '1'
      }
    }
    const res = {
      send
    }

    ecosystem.tweat(req, res)
    expect(send.mock.calls[0][0]).toHaveProperty('success')
  })

  it("Check home return with property success", () => {
    const send = jest.fn()
    const res = {
      send
    }

    ecosystem.home({}, res)
    expect(send.mock.calls[0][0]).toHaveProperty('data')
  })

  it("Check getProfile return with property id, name and feeds", () => {
    const send = jest.fn()
    const req = {
      params: {
        id: '1'
      }
    }
    const res = {
      send
    }

    ecosystem.getProfile(req, res)
    expect(send.mock.calls[0][0].data).toHaveProperty('id')
    expect(send.mock.calls[0][0].data).toHaveProperty('name')
    expect(send.mock.calls[0][0].data).toHaveProperty('feeds')
  })
})

describe("Test data", () => {
  beforeEach(() => {
    const send = jest.fn()
    const req = {
      body: {
        target_id: 2
      },
      params: {
        species_id: '1'
      }
    }
    const res = {
      send
    }
    ecosystem.tweat(req, res)
  })
  it("Check length returned by getEcosystem is 3", () => {
    const send = jest.fn()
    const res = {
      send
    }

    ecosystem.getEcosystem({}, res)
    expect(send.mock.calls[0][0].data).toHaveLength(3)
  })

  it("Check tweat return true when species_id and target_id is free to eat", () => {
    const send = jest.fn()
    const req = {
      params: {
        species_id: '2'
      },
      body: {
        target_id: 1
      }
    }
    const res = {
      send
    }

    ecosystem.tweat(req, res)
    expect(send.mock.calls[0][0]).toHaveProperty('success', false)
  })

  it("Check getFeed return data with property id, content, time, reference_id, species_id, replies", () => {
    const req = {
      params: {
        id: '1'
      }
    }
    const send = jest.fn()
    const res = {
      send
    }

    ecosystem.getFeed(req, res)
    expect(send.mock.calls[0][0].data).toHaveProperty('id')
    expect(send.mock.calls[0][0].data).toHaveProperty('content')
    expect(send.mock.calls[0][0].data).toHaveProperty('time')
    expect(send.mock.calls[0][0].data).toHaveProperty('reference_id')
    expect(send.mock.calls[0][0].data).toHaveProperty('species_id')
    expect(send.mock.calls[0][0].data).toHaveProperty('replies')
  })

  it("Check reply return success false if feed_id doesn't found", () => {
    const req = {
      body: {
        content: "hahaha lucuk"
      },
      params: {
        species_id: '3',
        feed_id: 'a'
      }
    }
    const send = jest.fn()
    const res = {
      send
    }

    ecosystem.reply(req, res)
    expect(send.mock.calls[0][0]).toHaveProperty('success', false)
  })
})

describe("Test with mock data", () => {
  beforeEach(() => {
    ecosystem.feeds = [
      {
        id: 2,
        content: "Aku dimakan @1",
        time: 1542891049,
        reference_id: 1,
        species_id: 2
      },
      {
        id: 1,
        content: "wah kalian saling memakan nih",
        time: 1542891075,
        reference_id: 1,
        species_id: 3
      }
    ]
  })

  afterEach(() => {
    ecosystem.feeds = []
  })

  it("Check home return with sorted data by newest", () => {
    let expectedResult = [
      {
        id: 1,
        content: "wah kalian saling memakan nih",
        time: 1542891075,
        reference_id: 1,
        species_id: 3
      },
      {
        id: 2,
        content: "Aku dimakan @1",
        time: 1542891049,
        reference_id: 1,
        species_id: 2
      }
    ]

    const send = jest.fn()
    const res = {
      send
    }

    ecosystem.home({}, res)

    expect(send.mock.calls[0][0].data).toEqual(expectedResult)
  })
})

describe("Test phase 2", () => {
  it("Check addSpecies success true", () => {
    const req = {
      body: {
        name: 'human'
      }
    }
    const send = jest.fn()
    const res = {
      send
    }

    ecosystem.addSpecies(req, res)
    expect(send.mock.calls[0][0]).toHaveProperty('success', true)
  })

  it("Check addSpecies success false", () => {
    const req = {
      body: {
        name: 'lion'
      }
    }
    const send = jest.fn()
    const res = {
      send
    }

    ecosystem.addSpecies(req, res)
    expect(send.mock.calls[0][0]).toHaveProperty('success', false)
  })

  it("Check addRelations success true", () => {
    const req = {
      body: {
        predator: 1,
        food: 3
      }
    }
    const send = jest.fn()
    const res = {
      send
    }

    ecosystem.addRelation(req, res)
    expect(send.mock.calls[0][0]).toHaveProperty('success', true)
  })

  it("Check addRelations success false with food and predator are same", () => {
    const req = {
      body: {
        predator: 1,
        food: 1
      }
    }
    const send = jest.fn()
    const res = {
      send
    }

    ecosystem.addRelation(req, res)
    expect(send.mock.calls[0][0]).toHaveProperty('success', false)
  })

  it("Check addRelations success false with food or predator not in ecosystem", () => {
    const req = {
      body: {
        predator: 'a',
        food: 1
      }
    }
    const send = jest.fn()
    const res = {
      send
    }

    ecosystem.addRelation(req, res)
    expect(send.mock.calls[0][0]).toHaveProperty('success', false)
  })

  it("Check getRelations return object to have property data and in data have property food and predator", () => {
    const send = jest.fn()
    const res = {
      send
    }

    ecosystem.getRelations({}, res)
    expect(send.mock.calls[0][0]).toHaveProperty('data')
    expect(send.mock.calls[0][0].data[0]).toHaveProperty('predator')
    expect(send.mock.calls[0][0].data[0]).toHaveProperty('food')
  })
})