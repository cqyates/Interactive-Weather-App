$(document).ready(function () {
  function success(position) {
    const lat  = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lon,lat)
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }


  $("#search-btn").on("click", function(){
    var searchValue = $("#search-value").val();

    $(".history").on("click","li",function() {
      searchWeather($(this).text())
    })

  
    makeRow(searchValue);
    searchWeather(searchValue)
  });

  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li)
  }

  function searchWeather(searchValue) {
    $.ajax({
      type: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=45ebbd33aab5c77a18994061b0a6ee6a&units=imperial`,
      dataType: "json",
      success: function(response) {
        $("#today").empty();
        var currentTemp = Math.floor(response.main.temp);
        var feelsTemp = Math.floor(response.main.feels_like)
        console.log(response)
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        var title = $("<h1>").addClass("card-title").text(response.name);
        var description = $("<h4>").addClass("card-text").text(response.weather[0].description)
        var temp = $("<h4>").addClass("card-text").text("current tempature is: " + currentTemp +String.fromCharCode(176));
        var feelsLike = $("<h4>").addClass("card-text").text("feels like " + feelsTemp +String.fromCharCode(176))
        var wind = $("<h4>").addClass("card-text").text("current wind speed: " + response.wind.speed)
     
        $("#today").append(card);
        card.append(cardBody);
        cardBody.append(title,description,temp,feelsLike,wind)
      
      }
    
    })
  }

  
});


//45ebbd33aab5c77a18994061b0a6ee6a