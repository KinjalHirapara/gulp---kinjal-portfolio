$(document).ready(function () {
    $('[data-toggle="popover"]').popover().click(function () {
        setTimeout(function () {
            $('[data-toggle="popover"]').popover('hide');
        }, 5000);
    });

    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "zoom",
            //"share",
            "slideShow",
            "fullScreen",
            //"download",
            "thumbs",
            "close"
        ]
    });
    AOS.init();
});
