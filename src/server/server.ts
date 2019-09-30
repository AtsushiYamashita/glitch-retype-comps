import * as express from 'express'
const app = express()

app.use(express.static('public'))

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + process.env.PORT)
})