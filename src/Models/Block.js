const MerkleTree = require('./MerkleTree')
const { sha256 } = require('./../Helpers/utils')

class Block {
  constructor(version, data, prevHash, difficulty) {
    this.data = data
    this.merkleTree = new MerkleTree(this.data)
    this.headers = {
      version,
      merkleRoot: this.merkleTree.getRoot(),
      prevHash,
      timestamp: Date.now(),
      difficulty,
      nonce: 0
    }

    this.hash = this.miningBlock()
  }

  generateHash() {
    return sha256(JSON.stringify(this.headers))
  }

  miningBlock() {
    let hash = ''
    while(!this.isValidBlock(hash)) {
      this.headers.nonce++
      hash = this.generateHash()
    }

    return hash
  }

  isValidBlock(hash) {
    return hash.substring(0, this.headers.difficulty) == '0'.repeat(this.headers.difficulty)
  }
}

module.exports = Block
