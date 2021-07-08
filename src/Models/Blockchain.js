const Block = require('./../Models/Block')
const _ = require('lodash')

class Blockchain {
    constructor() {
        this.chain = []
        this.transactionPool = []
        this.difficulty = 3
        this.version = 1
        this.transactionsPerBlock = 2
    }

    start()
    {
        this.fetchingTransaction()
        this.listenningToTransactionPool()
    }

    fetchingTransaction()
    {
        this.transactionPool.push('aaa')
        this.transactionPool.push('bbb')
        this.transactionPool.push('ccc')
    }

    listenningToTransactionPool()
    {
        let terminate = false
        while(!terminate) {
            if (!_.isEmpty(this.transactionPool)) {
                const block = this.createNewBlock()
                if (block.isValidBlock(block.hash)) {
                    this.chain.push(block)
                }
            }

            if (_.isEmpty(this.transactionPool)) {
                terminate = true
            }
        }
    }

    createNewBlock()
    {
        const lastBlock = this.lastBlock
        const transactions = this.pullFromTransactionPool(this.transactionsPerBlock)
        const block = new Block(this.version, transactions, lastBlock.hash, this.difficulty)

        return block
    }

    lastBlock()
    {
        return Object.assign({}, this.transactionPool[this.transactionPool.length - 1])
    }

    pullFromTransactionPool(number)
    {
        let data = []
        if(number >= this.transactionPool.length) {
            data = this.transactionPool
            this.transactionPool = []
            return data
        }

        while(number--) {
            data.push(this.transactionPool.pop())
        }

        return data
    }

    getChain() {
        return this.chain
    }
}

module.exports = Blockchain
