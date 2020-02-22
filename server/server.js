const express = require('express')
const cors = require('cors')
const monk = require('monk')
const Filter = require('bad-words')
const app = express()

const db = monk('localhost/mintis')
const mints = db.get('mints')
const filter = new Filter()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send({
        message: 'Mintis Server 🥥'
    })
})

function isValidMint(mint) {
    return mint.username && mint.username.toString().trim() !== '' && mint.username.toString().trim().length <= 50 &&
        mint.message && mint.message.toString().trim() !== '' && mint.message.toString().trim().length <= 140
}

app.post('/mints', (req, res) => {
    if (isValidMint(req.body)) {

        const mint = {
            username: filter.clean(req.body.username.toString().trim()),
            message: filter.clean(req.body.message.toString().trim()),
            created_date: new Date()
        }

        mints.insert(mint).then(createdMint => {
            res.json(createdMint)
        })

    } else {
        res.status(422)
        res.json({
            message: 'Invalid mint, must contain name and message'
        })
    }
})

app.listen(5000, () => {
    console.log('Server started on port 5000')
})