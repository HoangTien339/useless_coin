class Transaction {
    constructor(sender, receiver, value, timestamp) {
        this.sender = sender
        this.receiver = receiver
        this.value = value
        this.timestamp = timestamp
    }
}

module.exports = Transaction
