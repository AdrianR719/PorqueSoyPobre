var currentSalary = "$" + addCommas(salaryRange.value);
currentSliderValue.innerHTML = "Salario: " + currentSalary;
salaryRange.oninput = function () {
    var currentSalary = "$" + addCommas(this.value);
    currentSliderValue.innerHTML = "Salario: " + currentSalary;

    impuestosCalculado.innerHTML = "";
    //impuestosCalculado.innerHTML = "Impuesto: $" + addCommas(parseFloat(calculoIsr(this.value)).toFixed(2));
};

$(document).ready(function () {
    connectService(new Date().getFullYear());
});

function connectService(year) {
    $.ajax({
        url: 'http://localhost:8080/proyectoMexicali/proyectos',
        async: true,
        dataType:'json',
        data: {year: year},
        success: function (response, status, jqXHR) {

        },
        error: function (jqXHR, status, error) {
            alert("Todo se murio");
        }
    });
}

boton_impuestos.onclick = function () {
    $.ajax({
        url: "http://localhost:8080/impuesto/calculo",
        async: true,
        type: 'POST',
        data: {num: salaryRange.value},
        success: function (response, status, jqXHR) {
            console.log(response);
            impuestosCalculado.innerHTML = "Impuesto ISR: $" + addCommas(Number(response).toFixed(2));
        },
        error: function (jqXHR, status, error) {


            alert("Todo se murio");
        }
    });
    /* $.ajax({
         url: 'http://localhost:8080/calculo/' + this.value,
         async: true,
         success: function (response, status, jqXHR) {
             console.log(response);
             impuestosCalculado.innerHTML = "Impuesto ISR: " + response;
         },
         error: function (jqXHR, status, error) {
             alert("Todo se murio");
         }
     });*/
}
//Funcion para añadir comas a numeros
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

