var Location = [48.85341, 2.3488]; // default Paris
var LeLieu = "";
var IconeURL = "";
var MeteoTitre = "";
var MeteoDetail = "";
var Temperature = { value: 12, unit: "°C", display :"12°C" };
var Pression = "";
var Humidite = "";


function maPosition(pos) {
    Location[0] = pos.coords.latitude;
    Location[1] = pos.coords.longitude;
    console.log(Location);
}
function getWeather() {
    // source : https://fcc-weather-api.glitch.me/api/current?lat=48.85341&lon=2.3488
    $.ajax
        ({
                url: "https://fcc-weather-api.glitch.me/api/current?lat="+Location[0]+"&lon="+Location[1],
                cache: false,
                dataType: "text",
                success: function (data) {
                    var weatherObj = JSON.parse(data);
                    LeLieu = weatherObj["name"];
                    document.getElementById("LeLieu").innerHTML = LeLieu;
                    IconeURL = weatherObj.weather[0].icon;
                    MeteoTitre = weatherObj.weather[0].main;
                    MeteoDetail = weatherObj.weather[0].description;
                    Temperature.value = weatherObj.main.temp;
                    Temperature.display = Temperature.value + Temperature.unit;
                    Pression = weatherObj.main.pressure+" hPa";
                    Humidite = weatherObj.main.humidity+"%"
                    document.getElementById("Icone").src = IconeURL;
                    document.getElementById("Icone").alt = MeteoTitre;
                    document.getElementById("Icone").title = MeteoTitre;
                    $("#temperature").text(Temperature.display);
                    $("#pressure").text(Pression);
                    $("#humidity").text(Humidite);
                    $("#short").text(MeteoTitre);
                    $("#long").text(MeteoDetail);
                    console.log(MeteoTitre + " /" + MeteoDetail);

                    
                    // console.log(Meteo);

                }
            });
};






function afficheLaDate() {
    var d = new Date();
    var tmptext = "";
    var days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    var mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    tmptext = days[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + "</BR>";
    document.getElementById("LaDate").innerHTML = tmptext;
    
};

$("#unitchanger").change(function () {
    console.log("Click!");
    if (Temperature.unit == "°C") {
        Temperature.value = Temperature.value * 9 / 5 + 32;
        Temperature.unit = "°F";
        $("#switch").prop('checked', false);
    }
    else {
        Temperature.value = (Temperature.value - 32) * 5 / 9;
        Temperature.unit = "°C";
        $("#switch").prop('checked', true);
    }
    Temperature.display = Temperature.value + Temperature.unit;

    $("#temperature").text(Temperature.display);

});
    
$(document).ready(function () {
    navigator.geolocation.getCurrentPosition(maPosition);
    getWeather();
    afficheLaDate();
    document.getElementById("unitchanger").innerHTML = "TEST";

    // console.log(weatherObj);
    
    
});

