

$(document).ready(function () {
    connectService(new Date().getFullYear())

    $(".drop .option").click(function() {
        var val = $(this).attr("data-value"),
            $drop = $(".drop"),
            prevActive = $(".drop .option.active").attr("data-value"),
            options = $(".drop .option").length;
        connectService(val);
        $drop.find(".option.active").addClass("mini-hack");
        $drop.toggleClass("visible");
        $drop.removeClass("withBG");
        $(this).css("top");
        $drop.toggleClass("opacity");
        $(".mini-hack").removeClass("mini-hack");
        if ($drop.hasClass("visible")) {
            setTimeout(function() {
                $drop.addClass("withBG");
            }, 400 + options*100);
        }
        triggerAnimation();
        if (val !== "placeholder" || prevActive === "placeholder") {
            $(".drop .option").removeClass("active");
            $(this).addClass("active");
        };
    });

    function triggerAnimation() {
        var finalWidth = $(".drop").hasClass("visible") ? 22 : 20;
        $(".drop").css("width", "24em");
        setTimeout(function() {
            $(".drop").css("width", finalWidth + "em");
        }, 400);
    }
});

function connectService(year) {
    $.ajax({
        url: 'hhttps://web-services1.herokuapp.com/webService/proyectosMexicali',
        async: true,
        dataType:'json',
        data: {year: year},
        success: function (response, status, jqXHR) {
            displayData(response.proyectos,response.cant,response.sum,year);
        },
        error: function (jqXHR, status, error) {
            alert("Todo se murio");
        }
    });
}

function displayData(proyects,cant,sum,year){
    var i;
    document.getElementById("title").innerHTML = "$" + addCommas(sum);
    document.getElementById("info2").innerHTML = "Monto gastado en Mexicali durante el " + year +" de un total de "+cant + " proyectos";

    var text = document.getElementById("infoProyects");
    text.innerHTML = "";
    for (i = 0; i < cant; i++) {
        text.innerHTML +="<div class=\"col-sm-4\">\n" +
            "        <figure class=\"infobox infobox-more bg-blue \">\n" +
            "            <figcaption class=\"text-wrap\">\n" +
            "                <h4 class=\"title\">Monto aprobado: $"+ addCommas(proyects[i].monto_Aprobado) +"</h4>\n" +
            "                <p> "+ proyects[i].proyecto +"</p>\n" +
            "            </figcaption>\n" +
            "        </figure>\n" +
            "    </div>"
    }

}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
