window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.degree');
    let locationName = document.querySelector('.name');
    let temperatureIcon = document.getElementById("temperatureIcon")
    let wind = document.querySelector('.wind')
    let precipitation = document.querySelector('.precipitation')
    let visibility = document.querySelector('.visibility')
    let humidityp = document.querySelector('.humidity')
    let feelsLike = document.querySelector('.feels-like')
    let pressure = document.querySelector('.pressure')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.weatherapi.com/v1/forecast.json?key=472d1afca3884ad988231214220402&q=${lat}, ${long}&aqi=no`;
            fetch(api)
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                // set DOM Elements from the API
                // Extract and set temperature information
                const { temp_c, wind_kph, wind_dir, precip_mm, vis_km, humidity, feelslike_c, pressure_mb } = data.current;
                temperatureDegree.textContent = temp_c;
                wind.textContent = wind_kph + ' km/h';
                precipitation.textContent = precip_mm + ' mm';
                visibility.textContent = vis_km + ' km';
                humidityp.textContent = humidity + '%';
                feelsLike.textContent = feelslike_c + '\u00B0';
                pressure.textContent = pressure_mb + ' hPa';
                
                // Extract and set weather description and icon 
                const { text, icon } = data.current.condition;
                temperatureDescription.textContent = text;
                console.log(temperatureIcon.src);
                temperatureIcon.src = icon;
                console.log(temperatureIcon.src);

                // Extract temperature location
                const { name } = data.location;
                locationName.textContent = name
            });
        });
    } else {
        h1.textContent = "Browser does not support Geolocation"
    }
});