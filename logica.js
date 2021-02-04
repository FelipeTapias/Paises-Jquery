$(document).ready(function() {
    $('#selectCountry').on('change', function() {
        let alphaCodeCountry = $('#selectCountry option:selected').val();
        // console.log($('#selectCountry option:selected').val());
        getOneCountry(alphaCodeCountry);
    });
})


$.ajax({
    // la URL para la petición
    url: 'https://restcountries.eu/rest/v2/all',
    // especifica si será una petición POST o GET
    type: 'GET',
    // el tipo de información que se espera de respuesta
    dataType: 'json',

    // código a ejecutar si la petición es satisfactoria;
    // la respuesta es pasada como argumento a la función
    success: function(countrys) {
        countrysArray = countrys;
        console.log(countrysArray);
        countrys.forEach(country => {
            $('#selectCountry').append('<option value="' + country.alpha3Code + '">' + country.name + '</option>');
        });
    },

    // código a ejecutar si la petición falla;
    // son pasados como argumentos a la función
    // el objeto de la petición en crudo y código de estatus de la petición
    error: function(xhr, status) {
        alert('Disculpe, existió un problema');
    },
});

function getOneCountry(alphaCode) {
    $.ajax({
        // la URL para la petición
        url: 'https://restcountries.eu/rest/v2/alpha/' + alphaCode,

        // especifica si será una petición POST o GET
        type: 'GET',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function(json) {
            console.log(json);
        }
    });

}