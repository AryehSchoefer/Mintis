// Load config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './config/config.env' })
}

const express = require('express')
const cors = require('cors')
const Filter = require('bad-words')
const filter = new Filter()
const connectDB = require('./config/db')
const Message = require('./models/Message')

const app = express()
app.use(express.json())
app.use(cors())


// Connect to DB
connectDB()

// Transform message to string and prettify
function isValidMint(mint) {
    return mint.username && mint.username.toString().trim() !== '' &&
        mint.username.toString().trim().length <= 50 &&
        mint.message && mint.message.toString().trim() !== '' &&
        mint.message.toString().trim().length <= 140
}

app.get('/', (req, res) => {
    res.send({
        message: 'Mintis Server 🥥'
    })
})

app.get('/getMintis', async (req, res) => {
    await Message.find((err, msg) => {
        if (err) return console.error(err)
        res.json(msg)
    })
})

// insert message to DB
app.post('/insertMint', async (req, res) => {
    if (isValidMint(req.body)) {
        // Clean up req.body and store it in an object called mint
        const mint = {
            username: filter.clean(req.body.username.toString().trim()),
            message: filter.clean(req.body.message.toString().trim()),
        }

        // Create new Message
        const message = new Message({
            username: mint.username,
            message: mint.message
        })

        // Insert message into DB
        await message.save((err) => {
            if (err) return console.error(err)
            console.log(`Inserted:\n ${message}`)
        })

        res.json(`Succesfully Inserted Mint`)
    } else {
        // Respond with error if mint doesn't match isValidMint requirements
        res.status(422)
        res.json({
            message: 'Invalid mint, must contain name and message'
        })
    }
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(3000, () => {
    console.log(`Server listening on port ${PORT}`)
})