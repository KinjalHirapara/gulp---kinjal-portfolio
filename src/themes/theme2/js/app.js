$(window).resize(function () {
    var windowy = $(window).height();
    $(".bg-img").height(windowy);
    // $(".details_box").removeClass("add_animation");
    // $(".ipad_details_box").removeClass("add_animation");
});
$(document).ready(function () {
    // $(".details_box").addClass("add_animation");
    // $(".ipad_details_box").addClass("add_animation");
    var windowx = $(window).width();
    var windowy = $(window).height();
    $(".bg-img").height(windowy);

    var lastId;
    var topMenuHeight = $("#top_menu").outerHeight() + 15;
    var menuItems = $("#top_menu").find(".nav-link");
    var scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        $('.navbar-collapse').removeClass('show');
        e.preventDefault();
    });

    $(window).scroll(function () {

        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });

     // Add feature section and agent section table responsive
     $("table").wrap("<div class='table-responsive'></div>");

});

$(window).on('load', function () {
    AOS.refresh();
});