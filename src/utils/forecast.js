const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=195509dcac44ee9035d18eca5c277f20&query=${latitude},${longitude}`;
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            const windSpeed = body.current.wind_speed
            const precipitation = body.current.precip
            const message = `${description}. <br>Temperature: ${temperature} °C. <br>It feels like ${feelslike} °C. <br>Wind speed: ${windSpeed} mph. <br>Precipitation: ${precipitation} mm.`
            callback(undefined, message)
        }
    })
}

module.exports = forecast