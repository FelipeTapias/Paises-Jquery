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
        success: (data) => {
            let currencyOptions = "";
            data.currencies.forEach((currencie, index) => {
                currencyOptions += currencie.name + ", ";
            })
            console.log(data);
            $('.card').removeClass('d-none');
            "<img src='" + data.flag + "' class='card-img-top' alt='flag'>" +
                $('.card').html(
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>" + data.name + "</h5>" +
                    "</div>" +
                    "<ul class='list-group list-group-flush'>" +
                    "<li class='list-group-item'>Capital: " + data.capital + " </li>" +
                    "<li class='list-group-item'>Región: " + data.region + "</li>" +
                    "<li class='list-group-item'>Moneda: " + currencyOptions + " </li>" +
                    "</ul>");
        }
    });
}

function quitarClase(id) {
    $('#' + id).removeClass('active');

}

var contador = 1;

function quitarClaseNone() {
    if (contador == 1) {
        console.log('Click 1');
        contador++;
        $('#xp_dos').removeClass('d-none');
    } else if (contador == 2) {
        console.log('Click 2');
        $('#xp_tres').removeClass('d-none');
        $('#boton_xp').attr('disabled', 'disabled');
    }
}

function validationForm() {

    var form = $('#sc-form');

    $('#sc_formation').on('change', function() {
        let formation = $('#sc_formation option:selected').val();
        console.log($('#sc_formation option:selected').val());
        if (formation == 7) {
            $('#sc_formation_related').attr('disabled', 'disabled');
        } else {
            $('#sc_formation_related').removeAttr('disabled');
        }
    });

    $('#sc_formation_related').on('change', function() {
        let formation = $('#sc_formation_related option:selected').val();
        console.log($('#sc_formation_related option:selected').val());
        if (formation == 17) {
            $('#sc_other').removeClass('d-none');
        } else {
            $('#sc_other').addClass('d-none');
        }
    });


    $.validator.addMethod("letters",
        function(value, element) {
            return value == value.match(/^[a-zA-Zñáéíóú]{3,}\s[a-zA-Zñ\sñáéíóú]{2,}/g);
        });

    $.validator.addMethod("wordCount",
        function(value, element, params) {
            var typedWords = value.match(/\b/g).length / 2;

            if (typedWords >= params[0]) {
                return true;
            }
        }
    );

    $.validator.addMethod("scCustomEmail", function(value, element) {
        return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    });

    $.validator.addMethod("scCustomSelect", function(value, element) {
        return value;
    });

    form.validate({
        errorClass: 'sc-control__message--error',

        rules: {
            sc_name: {
                required: true,
                letters: true,
                wordCount: ['2'],
                minlength: 6
            },
            sc_phone: {
                required: true,
                minlength: 10,
                maxlength: 20,
                digits: true
            },
            sc_type_document: {
                required: true,
                scCustomSelect: true,
                minlength: 1,
            },
            sc_number_document: {
                required: true,
                minlength: 6,
                maxlength: 10,
                digits: true
            },
            sc_email: {
                required: true,
                email: true,
                scCustomEmail: true
            },
            sc_location: {
                required: true,
                scCustomSelect: true,
                minlength: 1
            },
            sc_formation: {
                required: true,
                scCustomSelect: true,
                minlength: 1
            },
            sc_other_related: {
                required: true,
                maxlength: 100
            },
            sc_salary: {
                required: true,
                maxlength: 8,
                digits: true
            }
        },
        messages: {
            sc_name: "Escribe dos palabras como mínimo",
            sc_phone: "Te faltó diligenciar este campo",
            sc_number_document: "Te faltó diligenciar este campo",
            sc_email: "Escribe un correo válido",
            sc_other_related: "Máximo 100 caracteres",
            sc_salary: "Escribe correctamente este campo"

        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass("sc-control__field--error");
            $(element).next('.sc-control__name').addClass("sc-control__name--error");
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass("sc-control__field--error");
            $(element).next('.sc-control__name').removeClass("sc-control__name--error");
        },
        submitHandler: function() {
            $successMsg.show();
        },
    });
}

$(function() {
    validationForm();
})