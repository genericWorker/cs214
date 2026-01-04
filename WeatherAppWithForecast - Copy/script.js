let weather = {
    apiKey: "82005d27a116c2880c8f0fcb866998a0",

    fetchWeather: function (city) {
        // 1. Current Weather Call
        $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${this.apiKey}`)
            .done((data) => {
                userCity = city;
                this.displayWeather(data);
                // 2. Forecast Call (triggers both Hourly and Daily)
                this.fetchForecast(city);
            })
            .fail(() => $(".error-message").text("City not found."));
    },

    displayWeather: function (data) {
        const { name, sys: { country }, weather: [{ icon, description }], main: { temp, temp_min, temp_max, feels_like, humidity }, wind: { speed, deg }, dt } = data;
        
        $(".city").text(country ? `${name}, ${country}` : name);
        $(".icon").attr("src", `https://openweathermap.org/img/wn/${icon}.png`);
        $(".time").text(new Date(dt * 1000).toLocaleString());
        $(".description").text(description);
        $(".temp").text(Math.round(temp) + degreesLabel);
        $(".temp_min").text(` / Low: ${Math.round(temp_min)}${degreesLabel}`);
        $(".temp_max").text(`Hi: ${Math.round(temp_max)}${degreesLabel}`);
        $(".feels_like").text(`Feels like ${Math.round(feels_like)}${degreesLabel}`);
        $(".humidity").text(`Humidity: ${humidity}%`);
        $(".wind").text(`Wind: ${speed}${speedLabel}`);
        $(".deg").text(` (${getCardinalDirection(deg)})`);
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
        const $hourlyContainer = $(".hourly-forecast");
        $hourlyContainer.empty();
        
        // Take the first 6 items (next 18 hours)
        list.slice(0, 6).forEach(item => {
            const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            $hourlyContainer.append(`
                <div class="forecast-item">
                    <span>${time}</span>
                    <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
                    <b>${Math.round(item.main.temp)}${degreesLabel}</b>
                </div>
            `);
        });
    },

    displayDaily: function (list) {
        const $dailyContainer = $(".daily-forecast");
        $dailyContainer.empty();

        // Filter for midday results to represent the day
        const dailyData = list.filter(item => item.dt_txt.includes("12:00:00"));

        dailyData.forEach(item => {
            const day = new Date(item.dt * 1000).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
            $dailyContainer.append(`
                <div class="forecast-item">
                    <span>${day}</span>
                    <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
                    <b>${Math.round(item.main.temp)}${degreesLabel}</b>
                    <small>${item.weather[0].description}</small>
                </div>
            `);
        });
    }
};