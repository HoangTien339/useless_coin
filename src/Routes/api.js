const express = require('express')
const router = express.Router()

const HomeAction = require('./../Controllers/Common/HomeAction')

const route = (container) => {
    router.get('/', HomeAction(container))

    return router
}

module.exports = route
