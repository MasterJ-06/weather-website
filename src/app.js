//Express version 4

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const PathDir = path.join (__dirname, '../public')
const ViewsPath = path.join(__dirname, '../templates/views')
const PartialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', ViewsPath)
hbs.registerPartials(PartialsPath)

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

if (port == process.env.PORT) {
    app.use(requireHTTPS)
}

// Set up static directory to serve
app.use(express.static(PathDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'MasterJ'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'MasterJ'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is the Help page',
        name: 'MasterJ'
    })
})

app.get('/forecast', (req, res) => {
    forecast(req.query.lat, req.query.long, (error, forcastData) => {
        if (error) {
            return res.send({ error })
        }

        const address = `${req.query.long},${req.query.lat}`

        geocode (address, (error, { location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forcastData,
                location,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'MasterJ',
        errMsg: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'MasterJ',
        errMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})