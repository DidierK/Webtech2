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
                          document.body.style.background = "url('./images/clear_sky_by_lfcjake.png') center";
                        }

                        if (data.currently.icon == "clear-night"){
                          document.body.style.background = "url('./images/472297.jpg') center";
                        }

                        if (data.currently.icon == "partly_cloudy_day"){
                          document.body.style.background = "url('./images/cloud_night.jpg') center";
                        }

                        if (data.currently.icon == "partly-cloudy_night"){
                          document.body.style.background = "url('./images/472297.jpg') center";
                        }

                        if (data.currently.icon == "cloudy"){
                          document.body.style.background = "url('./images/DSC076771.jpg') center";
                        }

                        if (data.currently.icon == "rain"){
                          document.body.style.background = "url('./images/rain.jpg') center";
                        }

                        if (data.currently.icon == "sleet"){
                          document.body.style.background = "url('./images/Sleet.jpg') center";
                        }

                        if (data.currently.icon == "snow"){
                          document.body.style.background = "url('./images/snow.jpg') center";
                        }

                        // Current temperature
                        var Far = data.currently.temperature;
                        var Cel = ((Far - 32) * 5) / 9;
                        var n = Cel.toFixed(1);
                        $(".weather-temp").text(n + " °");
                }
            });

        }
    };

    App.init();

}());
