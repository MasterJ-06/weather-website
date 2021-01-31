const request = require ('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9c4bb375813bba44fc57d02cff7b8966&query=' + lat + ',' + long + '&units=m'

    request ({ url, json: true }, (error, {body}) => {
        if (body.current.feelslike === body.current.temperature) {
            feelsLikeTemp = ''
        } else {
            feelsLikeTemp = 'It feels like ' + body.current.feelslike + ' degrees. '
        }
        if (error) {
            callback ('The Weather api is currently unavalible', undefined)
        } else if (body.error) {
            callback ('That location does not exist', undefined)
        } else {
            callback (undefined, 'It is currently ' +body.current.weather_descriptions[0] + ' with a temperature of ' + body.current.temperature + ' degrees. ' + feelsLikeTemp + 'The current wind speed is ' + body.current.wind_speed + ' kmph, and the humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast