// 🕒 TIME + DATE
function updateTime() {
    let now = new Date();

    document.getElementById("time").innerText = now.toLocaleTimeString();
    document.getElementById("date").innerText = now.toDateString();
}

setInterval(updateTime, 1000);
updateTime();


// 👋 GREETING
function setGreeting() {
    let hour = new Date().getHours();
    let greeting = "";

    if (hour < 12) greeting = "Good Morning, Sanjana";
    else if (hour < 18) greeting = "Good Afternoon, Sanjana";
    else greeting = "Good Evening, Sanjana";

    document.getElementById("greeting").innerText = greeting;
}

setGreeting();


// 📍 GET LOCATION
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherByLocation, showError);
    } else {
        document.getElementById("weather").innerText = "Geolocation not supported";
    }
}


// 🌦 WEATHER USING LOCATION
async function fetchWeatherByLocation(position) {
    try {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        let apiKey = "ebefe2e9ff15f777c29c63fd8dff0826";

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        let res = await fetch(url);
        let data = await res.json();

        if (data.cod !== 200) {
            document.getElementById("weather").innerText = "Weather error";
            return;
        }

        document.getElementById("weather").innerText =
            `Weather: ${data.main.temp}°C, ${data.weather[0].description} (${data.name})`;

    } catch {
        document.getElementById("weather").innerText = "Weather not available";
    }
}


// ❌ LOCATION ERROR
function showError() {
    document.getElementById("weather").innerText =
        "Location denied. Using default city.";

    getWeatherFallback();
}


// 🔁 FALLBACK WEATHER
async function getWeatherFallback() {
    try {
        let apiKey = "ebefe2e9ff15f777c29c63fd8dff0826";
        let city = "Hyderabad";

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        let res = await fetch(url);
        let data = await res.json();

        if (data.cod !== 200) {
            document.getElementById("weather").innerText = "Weather error";
            return;
        }

        document.getElementById("weather").innerText =
            `Weather: ${data.main.temp}°C, ${data.weather[0].description} (${city})`;

    } catch {
        document.getElementById("weather").innerText = "Weather not available";
    }
}


// 📰 NEWS (SAFE VERSION)
async function getNews() {
    try {
        let url = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";

        let proxy = "https://api.allorigins.win/raw?url=";
        let res = await fetch(proxy + encodeURIComponent(url));

        let text = await res.text();

        let parser = new DOMParser();
        let xml = parser.parseFromString(text, "text/xml");

        let items = xml.querySelectorAll("item");

        let newsHTML = "<h3>Top News</h3><ul>";

        for (let i = 0; i < 3; i++) {
            newsHTML += `<li>${items[i].querySelector("title").textContent}</li>`;
        }

        newsHTML += "</ul>";

        document.getElementById("news").innerHTML = newsHTML;

    } catch (error) {
        document.getElementById("news").innerText = "News not available";
    }
}

// 🚀 RUN
getLocation();
getNews();
setInterval(getLocation, 600000); // refresh every 10 min