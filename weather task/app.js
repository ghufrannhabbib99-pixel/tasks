// js is connect

const input = document.getElementById("cityinput");
const button = document.getElementById("searchbutton");
const result = document.getElementById("weatherresult");

button.addEventListener("click", async function() {
    const city = input.value.trim();
    if (city === "") {
        result.textContent = "please enter a city name";
        return;
    }

    result.innerHTML = `<p class="loading">Loading...</p>`;;
    const API_KEY = "7b38834aa7cad43326b95a89d7757e44";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ar`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("city not found");
        }
        const data = await response.json();
        console.log(data.name)
        const icon = data.weather[0].icon;
        const weather = data.weather[0].main;

        if (weather === "Clear") {
    document.body.style.background =
        "linear-gradient(135deg, #89f7fe, #66a6ff)";
}
else if (weather === "Clouds") {
    document.body.style.background =
        "linear-gradient(135deg, #bdc3c7, #2c3e50)";
}
else if (weather === "Rain") {
    document.body.style.background =
        "linear-gradient(135deg, #4b79a1, #283e51)";
}
else if (weather === "Thunderstorm") {
    document.body.style.background =
        "linear-gradient(135deg, #232526, #414345)";
}
else if (weather === "Snow") {
    document.body.style.background =
        "linear-gradient(135deg, #e6dada, #274046)";
}
else {
    document.body.style.background =
        "linear-gradient(135deg, #89f7fe, #66a6ff)";
}
        result.innerHTML = `
         <img 
        src="https://openweathermap.org/img/wn/${icon}@2x.png"
        alt="${data.weather[0].description}"
    <h2>${data.name}</h2>
    <h1>${Math.round(data.main.temp)} °C</h1>
    <p>${data.weather[0].description}</p>
    <p>Feels Like: ${Math.round(data.main.feels_like)} °C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <p>Pressure: ${data.main.pressure} hPa</p>
`;
    }
     catch (error) {
        result.textContent = error.message;
    }finally{console.log("request finished")}
});