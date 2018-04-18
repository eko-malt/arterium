//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require jquery.turbolinks
//= require turbolinks
//= require materialize
//= require_tree

var ready;
ready = function() {

    document.oncontextmenu = RightMouseDown;
    document.onmousedown = mouseDown;

    function mouseDown(e) {
        if (e.which==3) { //righClick
            return false;
        }
    }
    function RightMouseDown() { return false;}

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

    $('input[name=step8_indication]').change(function() {
        $('label[for=step8_indication_1]').removeClass('red_text');
        $('label[for=step8_indication_2]').removeClass('green_text');
        $('label[for=step8_indication_3]').removeClass('red_text');
        if (this.id === 'step8_indication_1') {
            $('label[for=step8_indication_1]').addClass('red_text');
            $('#step8_indication_2').prop('checked', false);
            $('#step8_indication_3').prop('checked', false)
        }
        if (this.id === 'step8_indication_2') {
            $('label[for=step8_indication_2]').addClass('green_text');
            $('#step8_indication_1').prop('checked', false);
            $('#step8_indication_3').prop('checked', false)
        }
        if (this.id === 'step8_indication_3') {
            $('label[for=step8_indication_3]').addClass('red_text');
            $('#step8_indication_1').prop('checked', false);
            $('#step8_indication_2').prop('checked', false)
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
        if (($('#doctor_s_name').val().length > 3) && ($('#doctor_f_name').val().length > 2)) {
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
                setTimeout(function() {
                    console.log($('#doctor_city').focus());
                }, 500);
            } else {
                swal("Необхідно ввести спеціальність")
            }
        } else {
            if (($('#spec_1').prop('checked') == true) || ($('#spec_2').prop('checked') == true)) {
                go_to(4);
                setTimeout(function() {
                    console.log($('#doctor_city').focus());
                }, 500);
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
                $('#step7_indication_3').prop('checked', true);
                $('#step7_indication_4').prop('checked', true);
            });
        }
    });

    $('#8toFinish').click(function() {
        if ($('#step8_indication_2').prop('checked') == true) {
            $('#doctor_your_indication').val('Вдвічі доступніша за  оригінальний іпідакрин');
            if ($('#spec_1').prop('checked') == true) { $('#doctor_spec').val('Невролог стаціонару'); }
            if ($('#spec_2').prop('checked') == true) { $('#doctor_spec').val('Невролог поліклініки'); }
            if ($('#spec_3').prop('checked') == true) { $('#doctor_spec').val($('#doctor_spec_other').val()); }
            $('#new_doctor').submit();
        } else {
            swal('Вартість однієї упаковки Медіаторну вдвічі доступніша за оригінальний іпідакрин').then((value) => {
                $('label[for=step8_indication_2]').addClass('green_text');
                $('label[for=step8_indication_1]').addClass('red_text');
                $('label[for=step8_indication_3]').addClass('red_text');
                $('#step8_indication_1').prop('checked', false);
                $('#step8_indication_2').prop('checked', true);
                $('#step8_indication_3').prop('checked', false);
                return false;
            });
        }
    });
}

$(document).on('turbolinks:load', ready);