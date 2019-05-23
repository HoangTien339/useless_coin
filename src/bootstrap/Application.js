const Blockchain = require('./../Models/Blockchain')
const kue = require('kue')

class Application
{
  constructor(app)
  {
    this.setupApplication()
    this.chain = new Blockchain()
  }

  setupApplication()
  {
    this.setupQueue()
  }

  setupQueue()
  {
    this.queue = kue.createQueue({
      redis: {
        host: 'redis'
      }
    })

    this.queue.create('minning').save();
    this.queue.process('minning', (job, done) => {
      this.chain.start()
      done && done();
    })
  }
}

module.exports = Application
