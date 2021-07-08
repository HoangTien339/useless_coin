const crypto = require('crypto')

const sha256 = (value) => {
  return crypto
    .createHash('sha256')
    .update(value)
    .digest('base64')
}

module.exports = {
  sha256
}
