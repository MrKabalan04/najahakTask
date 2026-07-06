require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const requestRoutes = require('./routes/requestRoutes')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/requests', requestRoutes)

app.get('/', (req, res) => {
    res.send('API is running...')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})