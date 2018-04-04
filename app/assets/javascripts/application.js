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
    $('.ml_ukr').mlKeyboard({
        layout: 'ua_UK'
    });
    $('.ml_eng').mlKeyboard({
        layout: 'en_US'
    });
    $('#print_button').click(function () {
        window.print();
    });
    $('#doctor_city').focus(function() {
            geolocate();
    });

    // set focus to input when check "Other" radio
    $('input[name=step3_spec]').change(function() {
        if (this.id === 'spec_3') { $('#doctor_spec_other').focus() }
    });

    // set "Other" radio when focused on Other input
    $('#doctor_spec_other').focusin(function() {
        $('#spec_3').prop('checked', true);
    });

    $('input[name=step5_mediatorn]').change(function() {
        console.log('step5');
        $('label[for=mediatorn_this_is_1]').removeClass('green_text');
        $('label[for=mediatorn_this_is_2]').removeClass('red_text');
        $('label[for=mediatorn_this_is_3]').removeClass('red_text');
        if (this.id === 'mediatorn_this_is_1') { $('label[for=mediatorn_this_is_1]').addClass('green_text') }
        if (this.id === 'mediatorn_this_is_2') { $('label[for=mediatorn_this_is_2]').addClass('red_text') }
        if (this.id === 'mediatorn_this_is_3') { $('label[for=mediatorn_this_is_3]').addClass('red_text') }
    });

    $('#step6 input').change(function() {
        correct_answer(this.id);
    });

    $('#step7 input').change(function() {
        correct_answer(this.id);
    });

    function correct_answer(check_id) {
        if ($('#' + check_id).prop('checked') === true) {
            $('label[for=' + check_id + ']').addClass('green_text');
        } else {
            $('label[for=' + check_id + ']').removeClass('green_text');
        }
    }

    $('#2to3').click(function() {
        $('#step2').hide('slide',{direction:'left'},1000);

        $('#step3').show('slide',{direction:'right'},1000);
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
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
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