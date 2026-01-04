let units = "metric";
let userCity = "Philadelphia";
const unsplashKey = "3aec8sTVyLBtqALtmIS3PAZlPpcTqD7SVl1OcUp7b9M";

const DegreeUnits = { Celsius: "°C", Fahrenheit: "°F" };
const SpeedUnits = { MPH: " mph", KPH: " km/h" };

let degreesLabel = DegreeUnits.Celsius;
let speedLabel = SpeedUnits.KPH;

const getLocalDate = (dt) => new Date(dt * 1000).toLocaleString([], {
    weekday: 'long', hour: '2-digit', minute: '2-digit'
});

function getCardinalDirection(angle) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(angle / 45) % 8];
}

let weather = {
    apiKey: "82005d27a116c2880c8f0fcb866998a0",

    fetchWeather: function (city) {
        $(".weather").addClass("loading").removeClass("error");
        $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${this.apiKey}`)
            .done((data) => {
                userCity = data.name;
                this.displayWeather(data);
                this.fetchForecast(city);
            })
            .fail(() => {
                console.log("Error: City not found.");
                // Update UI to show error instead of a generic loading screen
                $(".city").text("City not found");
                $(".weather").removeClass("loading");
            });
    },

    displayWeather: function (data) {
        const { name, sys: { country }, weather: [{ icon, description }], 
                main: { temp, temp_min, temp_max, feels_like, humidity }, 
                wind: { speed, deg }, dt } = data;

        const capitalizedDesc = description.charAt(0).toUpperCase() + description.slice(1);

        $(".city").text(country ? `${name}, ${country}` : name);
        $(".icon").attr("src", `https://openweathermap.org/img/wn/${icon}@2x.png`).attr("alt", description);
        $(".time").text(getLocalDate(dt));
        $(".description").text(capitalizedDesc);
        $(".temp").text(Math.round(temp) + degreesLabel);
        $(".feels_like").text(`Feels like ${Math.round(feels_like)}${degreesLabel}`);
        $(".temp_max").html(`<label>Hi</label> ${Math.round(temp_max)}${degreesLabel}`);
        $(".temp_min").html(`<label>Low</label> ${Math.round(temp_min)}${degreesLabel}`);
        $(".humidity").text(`Humidity: ${humidity}%`);
        $(".wind").text(`Wind speed: ${speed}${speedLabel}`);
        $(".deg").html(`<label>Direction:</label> ${deg}° ${getCardinalDirection(deg)}`);

        const query = encodeURIComponent(`${name} ${country} city landscape`); 
        $.getJSON(`https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&client_id=${unsplashKey}`)
            .done((imageData) => {
                if (imageData.results && imageData.results.length > 0) {
                    const imageUrl = imageData.results[0].urls.regular;
                    $('body').css('background-image', `url('${imageUrl}')`);
                } else {
                    $('body').css('background-image', `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80')`);
                }
            });

        $(".weather").removeClass("loading");
    },

    fetchForecast: function (city) {
        $.getJSON(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${this.apiKey}`)
            .done((data) => {
                this.displayHourly(data.list);
                this.displayDaily(data.list);
            });
    },

    displayHourly: function (list) {
        const $container = $(".hourly-forecast");
        $container.empty();
        list.slice(0, 10).forEach(item => {
            const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit' });
            $container.append(`
                <div class="forecast-item">
                    <span>${time}</span>
                    <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
                    <b>${Math.round(item.main.temp)}${degreesLabel}</b>
                    <div class="pop-label">${Math.round(item.pop * 100)}%</div>
                </div>`);
        });
    },

    displayDaily: function (list) {
        const $container = $(".daily-forecast");
        $container.empty();
        for (let i = 0; i < list.length; i += 8) {
            const item = list[i];
            const day = new Date(item.dt * 1000).toLocaleDateString([], { weekday: 'short' });
            $container.append(`
                <div class="forecast-item">
                    <span>${day}</span>
                    <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
                    <b>${Math.round(item.main.temp)}${degreesLabel}</b>
                    <div class="pop-label">${Math.round(item.pop * 100)}%</div>
                </div>`);
        }
    },
    
    search: function () {
        const query = $(".search-bar").val();
        if (query) {
            this.fetchWeather(query);
            $(".search-bar").val("");
        }
    }
};

function fetchUserCity() {
    const geoApiKey = "841afa96ceb940da8f6157a7f16cc527";
    $.getJSON(`https://api.geoapify.com/v1/ipinfo?apiKey=${geoApiKey}`)
        .done((data) => { 
            if (data && data.city && data.city.name) userCity = data.city.name;
        })
        .fail(() => console.log("Geolocation failed. Using default."))
        .always(() => weather.fetchWeather(userCity));
}

$(function () {
    fetchUserCity();
    
    $(".temp").on("click", function () {
        units = (units === "metric") ? "imperial" : "metric";
        degreesLabel = (units === "metric") ? DegreeUnits.Celsius : DegreeUnits.Fahrenheit;
        speedLabel = (units === "metric") ? SpeedUnits.KPH : SpeedUnits.MPH;
        weather.fetchWeather(userCity);
    });

    $(".search button").on("click", () => weather.search());
    $(".search-bar").on("keyup", (e) => { if (e.key === "Enter") weather.search(); });
});