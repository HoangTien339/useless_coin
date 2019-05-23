const { sha256 } = require('./../Helpers/utils')
const _ = require('lodash')

class MerkleTree {
  constructor(data) {
    this.tree = []
    this.leaves = this.createLeaves(data)
    this.tree.push(this.leaves)
    this.tree = this.calculateTree()
  }

  createLeaves(data) {
    let hashedLeaves = this.hashingLeaves(data)
    return this.evenLeaves(hashedLeaves)
  }

  hashingLeaves(data) {
    const leaves = []
    _.each(data, (value) => {
      const hashedResult = sha256(value)
      leaves.push(hashedResult)
    })

    return leaves
  }

  evenLeaves(hashedLeave) {
    if (hashedLeave.length % 2 != 0) {
      const doubledLastElement = hashedLeave[hashedLeave.length - 1]
      hashedLeave.push(doubledLastElement)
    }

    return hashedLeave
  }

  calculateTree() {
    const clonedTree = this.getTree()
    let referencedTopLayer = clonedTree[clonedTree.length - 1]

    while (referencedTopLayer.length != 1) {
      const currentLayer = this.cloneArray(referencedTopLayer)
      const nextLayer = this.hashingNextLayer(currentLayer)

      clonedTree.push(nextLayer)
      referencedTopLayer = clonedTree[clonedTree.length - 1]
    }

    return clonedTree
  }

  hashingNextLayer(currentLayer) {
    const hashed = []
    while (currentLayer.length != 0) {
      const left = currentLayer.pop()
      const right = currentLayer.pop()

      hashed.push(sha256(left + right))
    }

    return hashed
  }

  getTree() {
    return this.tree
  }

  cloneArray(source, ...additionalValues) {
    return _.concat(source, additionalValues)
  }

  getRoot() {
    return this.tree[this.tree.length - 1][0]
  }
}

module.exports = MerkleTree
