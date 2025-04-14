$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#backTop').fadeIn();
        } else {
            $('#backTop').fadeOut();
        }
    });
    $('#backTop').click(function(){
        $("html, body").animate({ scrollTop : 0 }, 1200);
    });

    // count albuam section
    var numgallery = $('.gallery-list').length;
    if(numgallery == 2){
        $(".gallery-list").addClass("col-lg-6 col-md-12");
        if (window.matchMedia('(min-width: 1024px)').matches)
            {
                $(".photos_gallery").css("border-right", "3px solid #000000");
            }
    }
    else {
        $(".gallery-list").addClass("col-lg-12 col-md-12");
    }
});