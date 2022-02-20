if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', (req, res) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${req.body.lat}, ${req.body.long}&aqi=no`
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data))
})

app.listen(3000, () => {
    console.log('Server Started!')
})