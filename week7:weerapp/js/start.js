/*global  $, Skycons*/
(function () {
    'use strict';

    var App = {
        APIKEY : "ec0f90ed8beaae6759c3707cf35b54b8",
        lat: "",
        lng: "",

        init: function () {
            //start app
            App.getLocation();
        },
        getLocation: function () {
            // current position of
            navigator.geolocation.getCurrentPosition(App.foundPosition);
        },
        foundPosition: function (pos) {
            // found the current user position
            App.lat = pos.coords.latitude;
            App.lng = pos.coords.longitude;
            App.getWeather();
        },
        getWeather: function () {
            // get the current weather on this location
            var url = "https://api.forecast.io/forecast/" + App.APIKEY + "/" + App.lat + "," + App.lng;

            //JSONP

            window.jQuery.ajax({
                url: url,
                dataType: "jsonp",
                success: function (data) {

                        //Print data
                        console.log(data);

                        //Current Summary text
                        var CurrentSummary = data.currently.summary;
                        $(".weather-summary").text(CurrentSummary);


                        //skycons
                        var skycons = new Skycons({"color": "white"});
                        skycons.add("weather-icon", data.currently.icon);
                        skycons.play();

                        if (data.currently.icon == "clear-day"){
                          $(".weather").css("background-image", "url('./images/clear_sky_by_lfcjake.png')");
                        }

                        if (data.currently.icon == "clear-night"){
                          $(".weather").css("background-image", "url('./images/472297.jpg')");
                        }

                        if (data.currently.icon == "partly-cloudy-day"){
                          $(".weather").css("background-image", "url('./images/sky_014.jpg')");
                        }

                        if (data.currently.icon == "partly-cloudy_night"){
                          $(".weather").css("background-image", "url('./images/cloudy_night.jpg')");
                        }

                        if (data.currently.icon == "cloudy"){
                          $(".weather").css("background-image", "url('./images/DSC076771.jpg')");
                        }

                        if (data.currently.icon == "rain"){
                          $(".weather").css("background-image", "url('./images/rain.jpg')");
                        }

                        if (data.currently.icon == "sleet"){
                          $(".weather").css("background-image", "url('./images/Sleet.jpg')");
                        }

                        if (data.currently.icon == "snow"){
                          $(".weather").css("background-image", "url('./images/snow.jpg')");
                        }

                        // Current temperature
                        var Far = data.currently.temperature;
                        var Cel = ((Far - 32) * 5) / 9;
                        var n = Cel.toFixed(1);
                        $(".weather-temp").text(n + " °");

                        //tomorrow summary
                        var TomorrowSummary = data.daily.data[1].summary;
                        $(".tomorrow-summary").text(TomorrowSummary);

                        // tomorrow temperature
                        var Tfar = data.daily.data[1].apparentTemperatureMax;
                        var Tcel = ((Tfar - 32) * 5) / 9;
                        var Tn = Tcel.toFixed(1);
                        $(".tomorrow-temp").text(Tn + " °");

                        //tomorrow skycon
                        var Tskycons = new Skycons({"color": "white"});
                        Tskycons.add("tomorrow-icon", data.daily.data[1].icon);
                        Tskycons.play();
                }
            });

        }
    };

    App.init();

}());
