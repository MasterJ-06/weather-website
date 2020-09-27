const request = require ('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent (address) + '.json?access_token=pk.eyJ1IjoiLWphY2stIiwiYSI6ImNrZjI4bjMwMDEybW8ycmxjMG4wdmc3ankifQ.486kpLYe1HNNllJSPZYnxg&limit=1'

    request ({ url, json: true }, (error, {body}) => {
        if (error) {
            callback ('The Geocoding service is currently unavalible', undefined)
        } else if (body.features.length === 0) {
            callback ('Those cordinates do not exist', undefined)
        } else {
            callback (undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode