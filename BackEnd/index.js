const connectToMongo = require('./db');
connectToMongo();


const express = require('express')
var cors = require('cors')

const app = express()
const port = 3000
app.use(express.json())



app.use(cors())


app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.get('/', (req, res) => {
    res.send('rakesh')
})


app.listen(port, () => {
    console.log(`iNoteBook Backend listening on port http://localhost:${port}`)
})



