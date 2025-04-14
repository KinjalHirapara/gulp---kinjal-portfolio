$(document).ready(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('.captcha-error').hide();
    $('#btn_submit').prop('disabled', false);

    $('#contact-form').on('submit', function(e) {
        if (grecaptcha.getResponse() == "") {
            e.preventDefault();
            $('.captcha-error').show();
        }
    });

    $(".btn_submit").click(function() {
        if (grecaptcha.getResponse() == "") {
            $('.captcha-error').show();
        } else {
            var validator = $('#contact-form').data('bootstrapValidator');
            validator.validate();
            if (validator.isValid()) {
                $(".formClass").remove();
                $(".appendFormClass").append('<div class="formClass alert"></div>');
                var themeId = 8;
                var addressID = $("input[name=addressID]").val();
                var fname = $("input[name=fname]").val();
                var email = $("input[name=email]").val();
                var phone = $("input[name=phone]").val();
                var message = $("textarea[name=message]").val();
                console.log(addressID);
                console.log(fname);
                console.log(email);
                console.log(phone);
                console.log(message);
                console.log(themeId);
            }
        }


        //         $.ajax({
        //             type: 'POST',
        //             url: '/submitEmail/' + addressID,
        //             data: {
        //                 fname: fname,
        //                 email: email,
        //                 phone: phone,
        //                 message: message,
        //                 fCapcha: fCapcha
        //             },
        //             success: function(data) {
        //                 $('html, body').animate({
        //                     'scrollTop': $("#contact").position().top
        //                 }, 1500);
        //                 if (data.success != null || data.success != undefined) {
        //                     $(".formClass").removeClass("alert-danger");
        //                     $(".formClass").addClass("alert-success");
        //                     $('.alert-success').html('<button type="button" onclick="emptyFieldFunction()" class="close theme2_css" data-dismiss="alert" aria-hidden="true">&times;</button>');
        //                     $(".formClass").append(data.success).show();
        //                 } else {
        //                     $(".formClass").removeClass("alert-success");
        //                     $(".formClass").addClass("alert-danger");
        //                     $('.alert-danger').html('<button type="button" class="close theme2_css" data-dismiss="alert" aria-hidden="true">&times;</button>');
        //                     $(".formClass").append(data.error).show();
        //                 }
        //             }
        //         });
        //     }
    });

    $("#contact-form").bootstrapValidator({
        fields: {
            fname: {
                validators: {
                    stringLength: {
                        min: 2
                    },
                    notEmpty: {
                        message: 'Name field is required'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Phone number field is required'
                    },
                    regexp: {
                        regexp: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                        message: 'Please supply a valid phone number'
                    }
                }
            },
            message: {
                validators: {
                    stringLength: {
                        min: 10,
                        message: 'Your message must be at least 10 characters'
                    },
                    notEmpty: {
                        message: 'Message field is required'
                    }
                }
            },
            email: {
                validators: {
                    stringLength: {
                        min: 2
                    },
                    notEmpty: {
                        message: 'Email field is required'
                    },
                    emailAddress: {
                        message: 'The email address is not valid'
                    }
                }
            }
        }
    });

    // $('#captcha_code').ready(function() {
    //     var addressID = $("input[name=addressID]").val();
    //     $.ajax({
    //         type: 'GET',
    //         url: '/addCaptcha/' + addressID,
    //         success: function(data) {
    //             return data;
    //         }
    //     });
    // });

    $('.a_share_game').click(function() {
        var media = $(this).data('media');
        var capsule_image_name = $(this).data('image-name');
        var property_name = encodeURI($(this).data('property-name'));
        var url_to_open = "";
        var current_url = window.location.href;
        //var current_url = "http://services.circlevisions.com/Near_GCET_College";

        switch (media) {
            case "facebook":
                url_to_open = "https://www.facebook.com/sharer/sharer.php?u=" + current_url + "?v=";
                break;
            case "linkedin":
                url_to_open = "https://www.linkedin.com/sharing/share-offsite/?url=" + current_url + "?latest";
                break;
            case "twitter":
                url_to_open = "https://twitter.com/share?&url=" + current_url + "?v=";
                break;
        }

        genericSocialShare(url_to_open);
    });

    function makeRandomNumber(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function genericSocialShare(url, media) {
        let numberUrl = url + makeRandomNumber(6);
        window.open(numberUrl, 'sharer', 'toolbar=0,status=0,width=800,height=600');
        return true;
    }
});