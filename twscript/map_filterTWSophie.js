javascript:
//barbarian finder by Sophie "Shinko to Kuma"

if (window.location.href.indexOf('map') < 0) {
    window.location.assign(game_data.link_base_pure + "map");
}
else {
    var currentVillX = game_data.village.x;
    var currentVillY = game_data.village.y;
    var barbarianVillages = [];
    var innerCircle;
    var outerCircle;
    var inRangeBarb = [];
    var backgroundColor = "#36393f";
    var borderColor = "#3e4147";
    var headerColor = "#202225";
    var titleColor = "#ffffdf";

    $.getAll = function (
        urls, // array of URLs
        onLoad, // called when any URL is loaded, params (index, data)
        onDone, // called when all URLs successfully loaded, no params
        onError // called when a URL load fails or if onLoad throws an exception, params (error)
    ) {
        var numDone = 0;
        var lastRequestTime = 0;
        var minWaitTime = 200; // ms between requests
        loadNext();
        function loadNext() {
            if (numDone == urls.length) {
                onDone();
                return;
            }

            let now = Date.now();
            let timeElapsed = now - lastRequestTime;
            if (timeElapsed < minWaitTime) {
                let timeRemaining = minWaitTime - timeElapsed;
                setTimeout(loadNext, timeRemaining);
                return;
            }
            console.log('Getting ', urls[numDone]);
            $("#progress").css("width", `${(numDone + 1) / urls.length * 100}%`);
            lastRequestTime = now;
            $.get(urls[numDone])
                .done((data) => {
                    try {
                        onLoad(numDone, data);
                        ++numDone;
                        loadNext();
                    } catch (e) {
                        onError(e);
                    }
                })
                .fail((xhr) => {
                    onError(xhr);
                })
        }
    };




    //check if we got recent version of village list
    var currentTime = Date.parse(new Date());
    var villageListData;
    if (localStorage.getItem("barbmapVillageTime") != null) {
        mapVillageTime = localStorage.getItem("barbmapVillageTime");
        if (currentTime >= parseInt(mapVillageTime) + 60 * 60 * 24 * 1000) {
            //hour has passed
            console.log("Hour has passed, recollecting the village data");
            $.get("map/village.txt", function (data) {
                villageListData = data;
                localStorage.setItem("barbmapVillageTime", Date.parse(new Date()));
                localStorage.setItem("barbmapVillageTxt", data);
            })
                .done(function () {
                    finish(data);
                });
        }
        else {
            // within same hour
            console.log("Hour not over yet, waiting to recollect, using old data");
            data = localStorage.getItem("barbmapVillageTxt");

            finish(data);
        }
    }
    else {
        //get villageTxt for first time
        console.log("Grabbing village.txt for the first time");
        $.get("map/village.txt", function (data) {
            villageListData = data;
            localStorage.setItem("barbmapVillageTime", Date.parse(new Date()));
            localStorage.setItem("barbmapVillageTxt", data);

        })
            .done(function () {
                finish(data);
            });

    }

    function check_a_village(a, b, x, y,i,o) {
        var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
        
        i*=i;
        o*=o;
        if (dist_points <= o && dist_points>=i) {
            return true;
        }
        return false;
    }

    function finish(list) {
        villages = CSVToArray(list);

        for (i = 0; i < villages.length; i++) {
            if (villages[i][4] == "0") {
                barbarianVillages.push(villages[i][2] + villages[i][3]);
            }
        }
        console.log("making display");

        if ($("#barbScript")[0]) $("#barbScript")[0].remove();


        var fakeHtml = `<div id="barbScript" class="ui-widget-content" style="background-color:${backgroundColor}">
        <table id="tableBarbShaper" class="vis" border="1" style="width: 100%;background-color:${backgroundColor};border-color:${borderColor}">
        <tr style="background-color:${backgroundColor}">
            <tr style="background-color:${backgroundColor}">
                <td id="fakeScriptTitle" style="text-align:center; width:auto; background-color:${headerColor}">
                <h2>
                    <center style="margin:10px"><u>
                            <font color="${titleColor}">Barb finder</font>
                        </u>    
                    </center>
                </h2>
            </td>
            </tr>
            <tr style="background-color:${backgroundColor}">
            <td style="text-align:center; width:auto; background-color:${backgroundColor}"><textarea id="script"  rows=7 style="width:500px;resize: none;background-color:${backgroundColor};color:${titleColor}" placeholder="Script output"></textarea></td>
            </tr>
            <tr style="background-color:${backgroundColor}">
            <td style="text-align:center; width:auto; background-color:${backgroundColor}"><textarea id="inner" maxlength=3 style="width:100px;resize: none;overflow:hidden;background-color:${backgroundColor};color:${titleColor}" placeholder="Enter inner radius"></textarea><textarea id="outer" maxlength=3 style="width:100px;resize: none;overflow:hidden;background-color:${backgroundColor};color:${titleColor}" placeholder="Enter outer radius"></textarea></td>
            </tr>
            
        <tr style="background-color:${backgroundColor}">
        <td style="text-align:center; width:auto; background-color:${backgroundColor}"><input type="button"  class="btn evt-confirm-btn btn-confirm-yes" id="findCoords" onclick="findBarbs()" value="Find barbs" ">
        </td></tr>
          </tr>
          <tr id="coords" style="background-color:${backgroundColor};width=100px">
          </tr>
        </table>
        <hr>
        <center><img id="sophieImg" class="tooltip-delayed" title="Sophie -Shinko to Kuma-" src="https://dl.dropboxusercontent.com/s/bxoyga8wa6yuuz4/sophie2.gif" style="cursor:help; position: relative"></center>
        <br>
        <center>
        <p><font color="${titleColor}">Creator: </font><a href="https://forum.tribalwars.net/index.php?members/shinko-to-kuma.121220/" style="text-shadow:-1px -1px 0 ${titleColor},1px -1px 0 ${titleColor},-1px 1px 0 ${titleColor},1px 1px 0 ${titleColor};" title="Sophie profile" target="_blank">Sophie "Shinko to Kuma"</a>
        </p>
        </center>
        </div>`;

        $("#minimap_whole").before(fakeHtml);
        $("#script").hide();
        if (game_data.locale == "ar_AE") {
            $("#sophieImg").attr("src", "https://media2.giphy.com/media/qYr8p3Dzbet5S/giphy.gif");
        }
    }


    function findBarbs() {
        inRangeBarb = [];
        scriptText = "";
        $("#coords")[0].innerHTML = "";
        innerCircle= $("#inner")[0].value;
        outerCircle=$("#outer")[0].value;
        for (var i = 0; i < barbarianVillages.length; i++) {
            if (barbarianVillages[i] != undefined) {
                target = barbarianVillages[i];
                target = target.toString();
                targetX = target.substring(0, 3);
                targetY = target.substring(3, 6);
                if (check_a_village(currentVillX, currentVillY, targetX, targetY,innerCircle,outerCircle) == true) {
                    inRangeBarb.push({ targetX, targetY });
                };
            }
        }
        var scriptText = "";
        for (var j = 0; j < inRangeBarb.length; j++) {
            scriptText += inRangeBarb[j].targetX + "|" + inRangeBarb[j].targetY + " ";
        }

        $("#coords")[0].innerHTML = `<font color="${titleColor}"><p>Total found: ${inRangeBarb.length}</p><p>${scriptText}</p></font>`;
        $("#script")[0].innerHTML = `javascript:coords='${scriptText}';var doc=document;if(window.frames.length>0 && window.main!=null)doc=window.main.document;url=doc.URL;if(url.indexOf('screen=place')==-1)alert('Use the script in the rally point page!');coords=coords.split(' ');index=0;farmcookie=document.cookie.match('(^|;) ?farm=([^;]*)(;|$)');if(farmcookie!=null)index=parseInt(farmcookie[2]);if(index>=coords.length)alert('All villages were extracted, now start from the first!');if(index>=coords.length)index=0;coords=coords[index];coords=coords.split('|');index=index+1;cookie_date=new Date(2021,3,27);document.cookie ='farm='+index+';expires='+cookie_date.toGMTString();doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];$('#place_target').find('input').val(coords[0]+'|'+coords[1]);doc.forms[0].spy.value=1;end();`;
        $("#script").show();
        var distance = [];
        var coordinateHome = currentVillX + "|" + currentVillY;
        for (k = 0; k < inRangeBarb.length; k++) {
            target = inRangeBarb[k].targetX + "|" + inRangeBarb[k].targetY;
            distance.push(target, calculateDistance(target, coordinateHome))
        }
        console.table(distance);
    }
    function calculateDistance(to, from) {
        var target = extractCoords(to).match(/(\d+)\|(\d+)/);
        var source = extractCoords(from).match(/(\d+)\|(\d+)/);
        var fields = Math.sqrt(Math.pow(source[1] - target[1], 2) + Math.pow(source[2] - target[2], 2));

        return fields;
    }
    function extractCoords(src) {
        var loc = src.match(/\d+\|\d+/ig);
        return (loc ? loc[loc.length - 1] : null);
    }

    function CSVToArray(strData, strDelimiter) {
        strDelimiter = (strDelimiter || ",");
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );
        var arrData = [[]];
        var arrMatches = null;
        while (arrMatches = objPattern.exec(strData)) {
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[1];
            if (
                //check if its string
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
            ) {
                //create new row
                arrData.push([]);
            }
            var strMatchedValue;

            if (arrMatches[2]) {

                //get rid of quotes
                strMatchedValue = arrMatches[2].replace(
                    new RegExp("\"\"", "g"),
                    "\""
                );

            } else {

                // no quotes
                strMatchedValue = arrMatches[3];
            }
            //add to array
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        // Return the parsed data.
        return (arrData);
    }

    function compareDates(x) {
        var start = x,
            end = new Date(),
            diff = new Date(end - start),
            hours = diff / 1000 / 60 / 60;
        console.log("checked " + hours + " ago for village list");
        return hours;
    }
}