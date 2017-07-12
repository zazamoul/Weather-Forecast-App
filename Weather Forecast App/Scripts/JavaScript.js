var HeureduBuild = "";
var HeuresdePrev = [];
var TableaudesPrev = [01, 04, 07, 10, 13, 16, 19, 22];

function getWeather() {
    $.ajax
            ({
                url: "http://www.infoclimat.fr/public-api/gfs/json?_ll=48.85341,2.3488&_auth=AxkHEFQqBCZTfldgA3UKIwBoDjsMegMkUS1SMVo%2FUC0Aa1c2BmYGYFI8BHlXeAo8VnsHZAA7ATFTOAZ%2BXy1WNwNpB2tUPwRjUzxXMgMsCiEALg5vDCwDJFE6UjdaKVAyAGJXMAZ7BmVSNQRlV3kKPFZnB3gAIAE4UzQGaV87VjQDZwdkVD4EYFM7VyoDLAo7ADsOPQwwAztRZlIzWmFQYgBnV2cGNAZmUjoEeFdnCj1WYgdvADcBPVMyBmZfLVYqAxkHEFQqBCZTfldgA3UKIwBmDjAMZw%3D%3D&_c=406eb2efc07527cbe8fac63d3b6a73ca",
                cache: false,
                dataType: "text",
                success: function (data) {
                    var weatherObj = JSON.parse(data);
                    HeureduBuild = weatherObj["model_run"];
                    console.log(HeuresduBuild);
                    HeuresdePrev = DateetHeure(HeureduBuild);

                    //for (i = 0; i++; i < 64) {

                    //}
                    
                    console.log(weatherObj);

                }
            });
};

function DeuxChiffres(Entier) {
    if (Entier < 10)
    { return "0" + Entier; }
    return "" + Entier;
};

function AAMMJJ(date) {
    var AAMMJJ = [];
    AAMMJJ[0] = date.getFullYear();
    AAMMJJ[1] = date.getMonth() + 1;
    AAMMJJ[2] = date.getDate();
    return AAMMJJ;

}

function DateetHeure(h) {
    var LibelleDesPrevs = [];
    var now = new Date();
    var heure = now.getHours();
    var heuredebutPrev = parseInt(h, 10);
    var i = -1;
    do {
        i++;
    }
    while (TableaudesPrev[i] <= heure);
    var indexdebutPrev = i;
    console.log(heure);
    console.log(indexdebutPrev);
    var tmpAAMMJJ = AAMMJJ(now);
    var annee = tmpAAMMJJ[0];
    var mois = tmpAAMMJJ[1];
    var jour = tmpAAMMJJ[2];
    now.setHours(TableaudesPrev[indexdebutPrev]);

    for (i = 0; i < 64; i++) { //"2017-03-12 16:00:00"
        tmpAAMMJJ = AAMMJJ(now);
        annee = tmpAAMMJJ[0];
        mois = tmpAAMMJJ[1];
        jour = tmpAAMMJJ[2];
        LibelleDesPrevs[i] = annee + "-" + DeuxChiffres(mois) + "-" + DeuxChiffres(jour) + " " + DeuxChiffres(TableaudesPrev[(i + indexdebutPrev) % 8]) + ":00:00";
        now.setHours(now.getHours() + 3);
    }
    return LibelleDesPrevs;


};

function afficheLaDate() {
    var d = new Date();
    var tmptext = "";
    var days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    var tranches = ["matin", "après-midi", "soirée", "nuit"];
    var mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    tmptext = days[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + "</BR>";
    document.getElementById("LaDate").innerHTML = tmptext;
    console.log();
};

$(document).ready(function () {
    getWeather();
    afficheLaDate();
});