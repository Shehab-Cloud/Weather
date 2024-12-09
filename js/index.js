let searchInput = document.getElementById("searchInput");
let rowData = document.getElementById("rowData");
const apiKey = "7d77b96c972b4d119a3151101212704";

getWeather("Cairo");

searchInput.addEventListener("input", function () {
  getWeather(searchInput.value);
});

async function getWeather(city) {
  try {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
    if (response.ok) {
      let data = await response.json();
      displayWeather(data);
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function displayWeather(data) {
  let cartoona = "";
  const forecast = data.forecast.forecastday;
  const location = data.location.name;

  
  cartoona += `
    <div class="col-md-4">
      <div class="card h-100 border-0">
        <div class="card-header text-white custom-card-header d-flex justify-content-between">
          <span>${formatDay(forecast[0].date)}</span>
          <span>${forecast[0].date}</span>
        </div>
        <div class="card-body custom-card-body text-white">
          <p class="card-text pt-2">${location}</p>
          <h5 class="card-title bgfont">${forecast[0].day.avgtemp_c}°C</h5>
          <div class="status-icon py-4">
          <img src="./images/116.webp" width="70" height="70" alt="">    
                </div>
          <div class="custom text-info pb-3">${forecast[0].day.condition.text}</div>
          <div class="icons-container gap-4">
            <div class="icon-with-text">
              <i class="fa-solid fa-umbrella"></i>
              <span>${forecast[0].day.daily_chance_of_rain}%</span>
            </div>
            <div class="icon-with-text">
              <i class="fa-solid fa-wind"></i>
              <span>${forecast[0].day.maxwind_kph} km/h</span>
            </div>
            <div class="icon-with-text">
              <i class="fa-solid fa-compass"></i>
              <span>${forecast[0].day.condition.wind_dir || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;


  for (let i = 1; i < forecast.length; i++) {
    cartoona += `
      <div class="col-md-4">
        <div class="card h-100 border-0">
          <div class="card-header text-white custom-card-header text-center hcard2 rounded-0">${formatDay(forecast[i].date)}</div>
          <div class="card-body custom-card-body text-white text-center card2 align-content-center">
            <div class="status-icon pb-3">
              <img src="./images/116.webp" width="35" height="35" alt="">
            </div>
            <h5 class="card-title">${forecast[i].day.avgtemp_c}°C</h5>
            <span class="text-white-50">${forecast[i].day.mintemp_c}°C</span>
            <div class="custom text-info pb-3">${forecast[i].day.condition.text}</div>
          </div>
        </div>
      </div>
    `;
  }

  document.getElementById('rowData').innerHTML = cartoona;
}

function formatDay(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-us", { weekday: "long" });
}
