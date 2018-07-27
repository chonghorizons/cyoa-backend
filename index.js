const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const restify = require('express-restify-mongoose')
const app = express()
const router = express.Router()
const cors = require('cors')



app.use(bodyParser.json())
app.use(methodOverride())
app.use(cors())


// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open!');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error!');
});

console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)
var Schema=mongoose.Schema

restify.serve(router, mongoose.model('Page', new mongoose.Schema({
  isFirst: {type: Boolean, required: true},
  pageText: { type: String, required: true }, // Top TWO lines should be the story title and info
  Link1:  { type: Schema.Types.ObjectId, ref: 'Page' },
  Link2:  { type: Schema.Types.ObjectId, ref: 'Page' },
  Link3:  { type: Schema.Types.ObjectId, ref: 'Page' },
  Link4:  { type: Schema.Types.ObjectId, ref: 'Page' },
  storyHead:  { type: Schema.Types.ObjectId, ref: 'Page' },
  backlink:  { type: Schema.Types.ObjectId, ref: 'Page' }
})))

app.use(router)

let port= 3001;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})
