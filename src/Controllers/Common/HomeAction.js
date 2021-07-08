const Block = require('./../../Models/Block')

module.exports = (container) => (request, response) => {
  return response.json({
    'status': 'success',
    'chain': container.chain.getChain()
  })
}
