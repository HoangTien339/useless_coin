const express = require('express')
const app = express()
const port = 3000
const router = require('./src/Routes/api')
const setup = require('./src/bootstrap/bootstrap')

app.container = setup(app)

const routes = router(app.container)

app.use('/', routes)
app.listen(port, () => console.log(`App is listening on port ${port} ...`))
