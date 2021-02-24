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

//Agregar experiencia en el mismo template, pero se cambia por el modal
// var contador = 1;
// function quitarClaseNone() {
//     if (contador == 1) {
//         console.log('Click 1');
//         contador++;
//         $('#xp_dos').removeClass('d-none');
//     } else if (contador == 2) {
//         console.log('Click 2');
//         $('#xp_tres').removeClass('d-none');
//         $('#boton_xp').attr('disabled', 'disabled');
//     }
// }

function addAttr() {
    $('#boton_xp').attr('href', "#sc-modal");
}

function validationForm() {

    var form = $('#sc-form');

    $('#sc_formation').on('change', _ => {
        let formation = $('#sc_formation option:selected').val();
        console.log($('#sc_formation option:selected').val());
        if (formation == 7) {
            $('#sc_formation_related').attr('disabled', 'disabled');
            $('#sc_other').addClass('d-none');
        } else {
            $('#sc_formation_related').removeAttr('disabled');
        }
    });

    $('#sc_formation_related').on('change', _ => {
        let formation = $('#sc_formation_related option:selected').val();
        console.log($('#sc_formation_related option:selected').val());
        if (formation == 17) {
            $('#sc_other').removeClass('d-none');
        } else {
            $('#sc_other').addClass('d-none');
        }
    });

    $("#sc_salary").mask('000.000.000.000', { reverse: true });

    $.validator.addMethod("letters",
        (value, element) => {
            return value == value.match(/^[a-zA-Zñáéíóú]{3,}\s[a-zA-Zñ\sñáéíóú]{2,}/g);
        });

    $.validator.addMethod("wordCount",
        (value, element, params) => {
            var typedWords = value.match(/\b/g).length / 2;

            if (typedWords >= params[0]) {
                return true;
            }
        }
    );

    $.validator.addMethod("fileSize",
        (value, element, param) => {
            let file = this.optional(element) || (element.files[0].size <= param);
            return file;
        }
    )

    $.validator.addMethod("scCustomEmail", (value, element) => {
        return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    });

    $.validator.addMethod("scCustomSelect", (value, element) => {
        return value;
    });

    $.validator.addMethod("scCustomSalary", (value, element) => {
        return value == value.match([0 - 9.]);
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
                maxlength: 100,
                minlength: 1
            },
            sc_salary: {
                required: true,
                maxlength: 10,
                minlength: 1,
                scCustomSalary: false
            },
            sc_company: {
                required: true,
                maxlength: 50
            },
            sc_time: {
                required: true,
                scCustomSelect: true,
                minlength: 1,
            },
            sc_charge: {
                required: true,
                maxlength: 50
            },
            sc_functions: {
                required: true,
                maxlength: 500
            },
            sc_policy: {
                required: true,
                minlength: 1
            },
            sc_file: {
                required: true,
                fileSize: 2097152,
                extension: "docx,jpg,png,doc,pdf"
            }
        },
        messages: {
            sc_name: "Escribe dos palabras como mínimo",
            sc_phone: "Te faltó diligenciar este campo",
            sc_number_document: "Te faltó diligenciar este campo",
            sc_email: "Escribe un correo válido",
            sc_other_related: "Máximo 100 caracteres",
            sc_salary: "Máximo 8 caracteres",
            sc_company: "Máximo 50 caracteres",
            sc_charge: "Máximo 100 caracteres",
            sc_functions: "Máximo 500 caracteres",
            sc_policy: "Debes aceptar las políticas de privacidad",
            sc_file: {
                required: "Te faltó diligenciar este campo",
                extension: "Formato de archivo no válido",
                fileSize: "Tamaño máximo: 2MB"
            },

        },
        highlight: (element, errorClass, validClass) => {
            $(element).addClass("sc-control__field--error");
            $(element).next('.sc-control__name').addClass("sc-control__name--error");
        },
        unhighlight: (element, errorClass, validClass) => {
            $(element).removeClass("sc-control__field--error");
            $(element).next('.sc-control__name').removeClass("sc-control__name--error");
        },
        submitHandler: _ => {
            $successMsg.show();
        },
    });
}

function activate_button_one() {
    var arrayVariables = [];
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    $('.sc-control__required').on('change', (e) => {
        var validInputs = {
            'sc_name': $('#sc_name').val().length >= 6,
            'sc_number_document': $('#sc_number_document').val().length >= 6 && $('#sc_number_document').val().length <= 10,
            'sc_phone': $('#sc_phone').val().length >= 10 && $('#sc_phone').val().length <= 20,
            'sc_email': regex.test($('#sc_email').val())
        };
        Object.entries(validInputs).forEach((entry, index) => {
            var entryValue = entry[1];
            arrayVariables[index] = entryValue;
        })
        var isValid = function isValid(currentValue) {
            return currentValue;
        };
        if (arrayVariables.every(isValid)) {
            $('#next-step-2').removeAttr('disabled');
        } else {
            $('#next-step-2').attr('disabled', 'disabled');
        }
    })
}

function activate_button_two() {
    $('#sc_formation_related').on('change', _ => {
        let formation_related = $('#sc_formation_related option:selected').val();
        if (formation_related == 17) {
            $('#next-step-3').attr('disabled', 'disabled');
            $('#sc_formation').on('change', _ => {
                let formation = $('#sc_formation option:selected').val();
                if (formation == 7) {
                    $('#sc_formation_related').append('<option value="1" selected disabled>No aplica</option>');
                    $('#next-step-3').removeAttr('disabled');
                }
            })
        } else {
            $('#next-step-3').removeAttr('disabled');
        }
    })
    const selectElement = document.getElementById('sc_other_related');
    selectElement.addEventListener('change', _ => {
        var arrayVariables = [];
        var validInputs = {
            'sc_other_related': $('#sc_other_related').val().length >= 1 && $('#sc_other_related').val().length <= 100
        };
        Object.entries(validInputs).forEach((entry, index) => {
            var entryValue = entry[1];
            arrayVariables[index] = entryValue;
        })
        var isValid = function isValid(currentValue) {
            return currentValue;
        };
        if (arrayVariables.every(isValid)) {
            $('#next-step-3').removeAttr('disabled');
        } else {
            $('#next-step-3').attr('disabled', 'disabled');
        }
        console.info(arrayVariables);
    })
}

function activate_button_three() {
    var arrayVariables = [];
    $('.sc-control__required').on('change', _ => {
        var validInputs = {
            'sc_salary': $('#sc_salary').val().length >= 1 && $('#sc_salary').val().length <= 10,
            'sc_policy': $('#sc_policy').prop('checked')
        };
        Object.entries(validInputs).forEach((entry, index) => {
            var entryValue = entry[1];
            arrayVariables[index] = entryValue;
        })
        var isValid = (currentValue) => currentValue;
        if (arrayVariables.every(isValid)) {
            $('#submit').removeAttr('disabled');
        } else {
            $('#submit').attr('disabled', 'disabled');
        }
    })
}

$(_ => {
    validationForm();
    activate_button_one();
    activate_button_two();
    activate_button_three();
})