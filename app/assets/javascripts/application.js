//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require jquery.turbolinks
//= require turbolinks
//= require materialize
//= require_tree

var ready;
ready = function() {
    Materialize.updateTextFields();
    $('select').material_select();
    $('.ml_ukr').mlKeyboard({ layout: 'ua_UK' });
    $('.ml_eng').mlKeyboard({ layout: 'en_US' });

    if ($('.thank_you').length > 0) {
        setTimeout(function() {
            $('.main-message').addClass('disabled');
            $('.thank_you').show();
            setTimeout(function() {
                window.location.href = '/'
            }, 10000)
        }, 10000);
    }

    $('#change_background').click(function() {
       if ($('.main-page').hasClass('disabled')) {
           $('.main-page2').addClass('disabled');
           $('.main-page').removeClass('disabled');
       } else {
           $('.main-page').addClass('disabled');
           $('.main-page2').removeClass('disabled');
       }
    });

    //  $('#doctor_city').focus(function() { geolocate() });

    $('input[name=spec]').change(function() {
        if (this.id === 'spec_1') {
            $('#spec_2').prop('checked', false);
            $('#spec_3').prop('checked', false)
        }
        if (this.id === 'spec_2') {
            $('#spec_1').prop('checked', false);
            $('#spec_3').prop('checked', false)
        }
        if (this.id === 'spec_3') {
            $('#spec_1').prop('checked', false);
            $('#spec_2').prop('checked', false);
            $('#doctor_spec_other').focus()
        }
    });

    // set "Other" checkbox when focused on Other input
    $('#doctor_spec_other').focusin(function() {
        $('#spec_1').prop('checked', false);
        $('#spec_2').prop('checked', false);
        $('#spec_3').prop('checked', true);
    });

    // set "Other" checkbox when focused on Other input
    $('#doctor_indication_other').focusin(function() {
        $('#step8_indication_5').prop('checked', true);
    });

    $('input[name=step5_mediatorn]').change(function() {
        $('label[for=mediatorn_this_is_1]').removeClass('green_text');
        $('label[for=mediatorn_this_is_2]').removeClass('red_text');
        $('label[for=mediatorn_this_is_3]').removeClass('red_text');
        if (this.id === 'mediatorn_this_is_1') {
            $('label[for=mediatorn_this_is_1]').addClass('green_text');
            $('#mediatorn_this_is_2').prop('checked', false);
            $('#mediatorn_this_is_3').prop('checked', false)
        }
        if (this.id === 'mediatorn_this_is_2') {
            $('label[for=mediatorn_this_is_2]').addClass('red_text');
            $('#mediatorn_this_is_1').prop('checked', false);
            $('#mediatorn_this_is_3').prop('checked', false)
        }
        if (this.id === 'mediatorn_this_is_3') {
            $('label[for=mediatorn_this_is_3]').addClass('red_text');
            $('#mediatorn_this_is_1').prop('checked', false);
            $('#mediatorn_this_is_2').prop('checked', false)
        }
    });

    $('#step6 input').change(function() { correct_answer(this.id) });
    $('#step7 input').change(function() { correct_answer(this.id) });

    function correct_answer(check_id) {
        if ($('#' + check_id).prop('checked') === true) {
            $('label[for=' + check_id + ']').addClass('green_text');
        } else {
            $('label[for=' + check_id + ']').removeClass('green_text');
        }
    }

    function go_to(step) {
        $('#step' + (step-1)).hide('slide',{direction:'left'},700);
        setTimeout(function(){ $('#step' + step).show('slide',{direction:'right'},500);}, 200);
    }

    function hide_this_fuckin_keyboard() {
        $('#mlkeyboard').slideUp(300);
        $('.mlkeyboard_eng').slideUp(300);
    }

    // name to specialization
    $('#2to3').click(function() {
        hide_this_fuckin_keyboard();
        if (($('#doctor_s_name').val().length > 3) && ($('#doctor_f_name').val().length > 3)) {
            go_to(3)
        } else {
            swal("Необхідно ввести ім''я та прізвище")
        }
    });

    // spec to city
    $('#3to4').click(function() {
        hide_this_fuckin_keyboard()
        if ($('#spec_3').prop('checked') == true) {
            if ($('#doctor_spec_other').val().length > 3) {
                go_to(4);
            } else {
                swal("Необхідно ввести спеціальність")
            }
        } else {
            if (($('#spec_1').prop('checked') == true) || ($('#spec_2').prop('checked') == true)) {
                go_to(4)
            } else {
                swal("Необхідно обрати або ввести спеціальність")
            }
        }
    });

    // city to this is
    $('#4to5').click(function() {
        hide_this_fuckin_keyboard()
        if ($('#doctor_city').val().length > 3) {
            go_to(5)
        } else {
            swal("Необхідно ввести місто")
        }
    });

    // this is to effects
    $('#5to6').click(function() {
        hide_this_fuckin_keyboard()
        if ($('#doctor_mediatorn').val() == '') {
            if ($('#mediatorn_this_is_1').prop('checked') == true) { $('#doctor_mediatorn').val($('label[for=mediatorn_this_is_1]').html()); }
            if ($('#mediatorn_this_is_2').prop('checked') == true) { $('#doctor_mediatorn').val($('label[for=mediatorn_this_is_2]').html()); }
            if ($('#mediatorn_this_is_3').prop('checked') == true) { $('#doctor_mediatorn').val($('label[for=mediatorn_this_is_3]').html()); }
        };
        if ($('#mediatorn_this_is_1').prop('checked') == true) {
            go_to(6)
        } else {
            swal('Медіаторн – це препарат іпідакрину гідрохлориду.').then((value) => {
                $('label[for=mediatorn_this_is_1]').addClass('green_text');
                $('label[for=mediatorn_this_is_2]').removeClass('red_text');
                $('label[for=mediatorn_this_is_3]').removeClass('red_text');
                $('#mediatorn_this_is_1').prop('checked', true);
                $('#mediatorn_this_is_2').prop('checked', false);
                $('#mediatorn_this_is_3').prop('checked', false)
            });
        }
    });

    // effects to indications
    $('#6to7').click(function() {
        hide_this_fuckin_keyboard()
        if ($('#doctor_effects').val() == '') {
            if ($('#step6_effect_1').prop('checked') == true) { $('#doctor_effects').val($('label[for=step6_effect_1]').html()); }
            if ($('#step6_effect_2').prop('checked') == true) { $('#doctor_effects').val($('#doctor_effects').val() + '; ' + $('label[for=step6_effect_2]').html()); }
            if ($('#step6_effect_3').prop('checked') == true) { $('#doctor_effects').val($('#doctor_effects').val() + '; ' + $('label[for=step6_effect_3]').html()); }
        };
        if (($('#step6_effect_1').prop('checked') == true) && ($('#step6_effect_2').prop('checked') == true) && ($('#step6_effect_3').prop('checked') == true)) {
            go_to(7)
        } else {
            swal('Медіаторн має всі три вказані клінічні ефекти.').then((value) => {
                $('label[for=step6_effect_1]').addClass('green_text');
                $('label[for=step6_effect_2]').addClass('green_text');
                $('label[for=step6_effect_3]').addClass('green_text');
                $('#step6_effect_1').prop('checked', true);
                $('#step6_effect_2').prop('checked', true);
                $('#step6_effect_3').prop('checked', true)
            });
        }
    });

    // indications to your indications
    $('#7to8').click(function() {
        hide_this_fuckin_keyboard()
        if ($('#doctor_indication').val() == '') {
            if ($('#step7_indication_1').prop('checked') == true) { $('#doctor_indication').val($('#doctor_indication').val() + 'Моно- і полінейропатії, полірадикулопатії різної етіології; '); }
            if ($('#step7_indication_2').prop('checked') == true) { $('#doctor_indication').val($('#doctor_indication').val() + 'Міастенія та міастенічний синдром; '); }
            if ($('#step7_indication_3').prop('checked') == true) { $('#doctor_indication').val($('#doctor_indication').val() + 'Ураження ЦНС, бульбарні порушення; '); }
            if ($('#step7_indication_4').prop('checked') == true) { $('#doctor_indication').val($('#doctor_indication').val() + 'Рухові порушення внаслідок органічних уражень ЦНС; '); }
        };
        if (($('#step7_indication_1').prop('checked') == true) && ($('#step7_indication_2').prop('checked') == true) && ($('#step7_indication_3').prop('checked') == true) && ($('#step7_indication_1').prop('checked') == true)) {
            go_to(8)
        } else {
            swal('Всі вказані показання є підставою для призначення Медіаторну.').then((value) => {
                $('label[for=step7_indication_1]').addClass('green_text');
                $('label[for=step7_indication_2]').addClass('green_text');
                $('label[for=step7_indication_3]').addClass('green_text');
                $('label[for=step7_indication_4]').addClass('green_text');
                $('#step7_indication_1').prop('checked', true);
                $('#step7_indication_2').prop('checked', true);
                $('#step7_indication_3').prop('checked', true)
                $('#step7_indication_4').prop('checked', true)
            });
        }
    });

    $('#new_doctor').submit(function() {
        if ($('#spec_1').prop('checked') == true) { $('#doctor_spec').val('Невролог стаціонару'); }
        if ($('#spec_2').prop('checked') == true) { $('#doctor_spec').val('Невролог поліклініки'); }
        if ($('#spec_3').prop('checked') == true) { $('#doctor_spec').val($('#doctor_spec_other').val()); }

        if ($('#step8_indication_1').prop('checked') == true) { $('#doctor_your_indication').val($('#doctor_your_indication').val() + 'Моно- і полінейропатії, полірадикулопатії різної етіології; '); }
        if ($('#step8_indication_2').prop('checked') == true) { $('#doctor_your_indication').val($('#doctor_your_indication').val() + 'Міастенія та міастенічний синдром; '); }
        if ($('#step8_indication_3').prop('checked') == true) { $('#doctor_your_indication').val($('#doctor_your_indication').val() + 'Ураження ЦНС, бульбарні порушення; '); }
        if ($('#step8_indication_4').prop('checked') == true) { $('#doctor_your_indication').val($('#doctor_your_indication').val() + 'Рухові порушення внаслідок органічних уражень ЦНС; '); }
        if ($('#step8_indication_4').prop('checked') == true) { $('#doctor_your_indication').val($('#doctor_your_indication').val() + $('#doctor_indication_other').val()) }

        return true;
    });

    /*create_and_show_numpad();

    function create_and_show_numpad() {
        const numbers = "123456789";
        const buttonClass = 'numpad';
        const buttonBackspace = 'backspace';
        const number2dial = document.getElementById('number2dial');

        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('numpad-container');

        function addButton(number) {
            var button = document.createElement('button');
            button.innerHTML = number;
            button.classList.add(buttonClass);
            buttonContainer.appendChild(button);
        }

        function addBackspace() {
            var button = document.createElement('button');
            button.innerHTML = "Del";
            button.classList.add("backspace");
            buttonContainer.appendChild(button);
        }

        numbers.split('').forEach(addButton);
        addBackspace();
        addButton('0');
        document.querySelector('.numpad_target').appendChild(buttonContainer);


        $('.backspace').click(function (e) {
            if (e.target.classList.contains(buttonBackspace)) {
                number2dial.innerHTML = number2dial.innerHTML.slice(0, -1);
            }
            if ($('#number2dial').text().length == 13) {
                $('#download').attr('disabled', false).removeClass('transparent-button')
            } else {
                $('#download').attr('disabled', true).addClass('transparent-button');
            }
        });

        $('.numpad').click(function (e) {
            if (e.target.classList.contains(buttonClass)) {
                number2dial.innerHTML += e.target.innerHTML;
            }
            if (e.target.classList.contains(buttonBackspace)) {
                number2dial.innerHTML = number2dial.innerHTML.slice(0, -1);
            }
            $('#download-photo').attr('download', num + "_" + $('#number2dial').text());
            if ($('#number2dial').text().length == 13) {
                $('#download').attr('disabled', false).removeClass('transparent-button')
            } else {
                $('#download').attr('disabled', true).addClass('transparent-button');
            }
        });
    }*/
}

$(document).on('turbolinks:load', ready);

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    console.log('geolocate');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}