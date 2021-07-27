const weatherForm = document.querySelector('form')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const long = position.coords.longitude

        fetch(`/forecast?lat=${lat}&long=${long}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    msg1.textContent = data.error
                } else {
                    msg1.textContent = data.location
                    msg2.textContent = data.forecast
                }
            })
        })
    })
})