$(document).ready(function () {
    $("#contact-form").bootstrapValidator({
        fields: {
            fname:{
                validators:{
                    stringLength: {
                        min: 2,
                        message: 'Name should contain at least 2 characters',
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
            message:{
                validators:{
                    stringLength: {
                        min: 10,
                        message: 'Message should contain at least 10 characters'
                    },
                    notEmpty: {
                        message: 'Message field is required'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Email field is required'
                    },
                    emailAddress: {
                        message: 'The email address is not valid'
                    }
                }
            },
            fCapcha: {
                validators: {
                    stringLength: {
                        min: 4,
                        message: 'Captcha should contain at least 4 digits',
                    },
                    notEmpty: {
                        message: 'Captcha field is required'
                    }
                }
            }
        }
    });
});
$('form').on('focus', 'input[type=number]', function (e) {
    $(this).on('wheel.disableScroll', function (e) {
      e.preventDefault()
    })
  })
  $('form').on('blur', 'input[type=number]', function (e) {
    $(this).off('wheel.disableScroll')
  })