const temperatureDegree = document.querySelector('.temperature-degree');
const temperatureDescription = document.querySelector('.temperature-description');
const locationTimezone = document.querySelector('.location-timezone');
const temperatureIcon = document.querySelector('.icon');
const temperatureSection = document.querySelector('.temperature');
const temperatureSpan = document.querySelector('.temperature span');

//to get the langitude and latitude of our location
window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`
            // const api = 'api.openweathermap.org/data/2.5/weather?lat=51.8722068&lon=4.480647200000001&appid=7b26fb851427301dda0278b4a86f41f0';
            // const apii = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7b26fb851427301dda0278b4a86f41f0`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;
                    //set Dom elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Formula to CELSIUS
                    const celsius = (temperature - 32) * (5 / 9);
                    //Set icon
                    setIcons(icon, temperatureIcon);

                    //convert temperature to Celisus/Faarenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'F') {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = temperature;
                        }
                    })

                });
        });

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});