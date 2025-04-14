$(document).ready(function() {
    var window_h = $(window).height();
    $(".header").height(window_h);
    setTimeout(function() {
        $("#tv").removeClass("d-none");
    }, 1000);

    if (iOS()) {
        $(".spinner-sec").addClass("d-flex").removeClass("d-none");
    }

    function iOS() {
        return [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPod'
            ].includes(navigator.platform)
            // iPad on iOS 13 detection
            ||
            (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }

    $('.sidebar-collapse').click(function(e) {
        $('.sidebar').toggleClass('visible');
        if ($('.sidebar').hasClass('visible')) {
            $('.sidebar-conflict').css('visibility', 'hidden');

        } else {
            $('.sidebar-conflict').css('visibility', 'visible');
        }
        e.stopPropagation();
        return false;
    });

    $('#sidebar-nav .nav-link').click(function(event) {
        var duration = 500;
        $('.sidebar').removeClass('visible');
        if ($('.sidebar').hasClass('visible')) {
            $('.sidebar-conflict').css('visibility', 'hidden');
        } else {
            $('.sidebar-conflict').css('visibility', 'visible');
        }
        if ($(this).hasClass('nav-link')) {
            duration = 0;
        }

        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname) {
            //check for ID
            var target = $(this.hash);
            // If not check for name
            if (!target.length) {
                target = $('[name=' + this.hash.slice(1) + ']');
            }

            // Does a target exist?
            if (target.length) {
                // Prevent Default
                event.preventDefault();

                //Consider Fixed/Unfixed Menu difference for Scrolling
                var scrollOffsetHeight = 0;

                //Scroll
                $('html, body').animate({ scrollTop: target.offset().top - scrollOffsetHeight - $(".navbar.fixed-top").height() - 20 }, duration, function() {
                    // Callback after animation
                    var $target = $(target);
                    //change focus
                    $(target).focus();
                    if ($(target).is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $(target).attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $(target).focus(); // Set focus again
                    };
                });
                return false;
            }
        }
    });

    $(window).on("resize", function(event) {
        var window_h = $(window).height();
        $(".header").height(window_h);
        if ($("#vimeo-fullscreen").length != 0) {
            vRescale();
        }
        setVideoBGColor();
        setHeaderTop();
        setFeaturesHeight();

    });

    setHeaderTop();

    function setHeaderTop() {
        if ($(".gallary-header-top").length > 0) {
            var headertop = $(".gallary-header-top").height();
            document.documentElement.style.setProperty("--headertop", headertop + 'px');
            var gallery_min_h = $(window).height() - ($(".gallary-header").outerHeight(true) + $(".bg-footer").outerHeight(true));
            document.documentElement.style.setProperty("--galleryHeight", gallery_min_h + 'px');
        }
    }

    setFeaturesHeight();

    function setFeaturesHeight() {
        if ($(".all-videos").length > 0) {
            if ($(window).width() >= 576) {
                var f_h = Math.floor($(".all-videos").height());
                if ($(".videos-section").length == 1) {
                    document.documentElement.style.setProperty("--featuresMaxHeight", ((f_h + f_h) - 42) + 'px');
                } else {
                    document.documentElement.style.setProperty("--featuresMaxHeight", (f_h - 42) + 'px');
                }
            } else {
                document.documentElement.style.setProperty("--featuresMaxHeight", 'auto');
                setVideoBGColor();
            }
        }
    }

    // Listen for orientation changes      
    window.addEventListener("orientationchange", function() {
        var middel_scroll = scrolltop_pos + 300;
        if ($("#gallery").length != 0) {
            if (middel_scroll > $("#gallery").position().top && scrolltop_pos < ($("#gallery").position().top + $("#gallery").height())) {
                $(window).scrollTop($("#gallery").position().top);
            }
        }
        if ($(".video-section-bg").length != 0) {
            if (middel_scroll > $(".video-section-bg").position().top && scrolltop_pos < ($(".video-section-bg").position().top + $(".video-section-bg").height())) {
                $(window).scrollTop($(".video-section-bg").position().top);
            }
        }
        if ($("#floor_plan").length != 0) {
            if (middel_scroll > $("#floor_plan").position().top && scrolltop_pos < ($("#floor_plan").position().top + $("#floor_plan").height())) {
                $(window).scrollTop($("#floor_plan").position().top);
            }
        }
        if ($("#schedule").length != 0) {
            if (middel_scroll > $("#schedule").position().top && scrolltop_pos < ($("#schedule").position().top + $("#schedule").height())) {
                $(window).scrollTop($("#schedule").position().top);
            }
        }
        if ($("#contact").length != 0) {
            if (middel_scroll > $("#contact").position().top && scrolltop_pos < ($("#contact").position().top + $("#contact").height())) {
                $(window).scrollTop($("#contact").position().top);
            }
        }
    }, false);

    function vRescale() {
        var w = $(window).width() + 200,
            h = $(window).height() + 200;
        if (w / h > 16 / 9) {
            $(playerID).width(w).height(w / 16 * 9);
            $(playerID).css({
                'left': '0px'
            });

        } else {
            $(playerID).width(h / 9 * 16).height(h);
            $(playerID).css({
                'left': -($(playerID).outerWidth() - w) / 2
            });
        }
    }

    var playerID = '#vimeo-fullscreen';
    var playerIframe = $(playerID)[0];
    if ($("#vimeo-fullscreen").length != 0) {
        var player = new Vimeo.Player(playerIframe);
        player.play().then(function() {
            // the video was played
        }).catch(function(error) {
            switch (error.name) {
                case 'PasswordError':
                    // the video is password-protected and the viewer needs to enter the
                    // password first
                    console.log('Pass error');
                    break;

                case 'PrivacyError':
                    console.log('Vimeo Video is private. Cannot play');
                    break;

                default:
                    console.log(error.name);
                    break;
            }
        });
    }



    if ($("#vimeo-fullscreen").length != 0) {
        vRescale();
    }

    var menuItems = $(".top-menu").find(".nav-link");
    var scrollItems = menuItems.map(function() {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

    menuItems.click(function(e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        $('.navbar-collapse').removeClass('show');
        e.preventDefault();
    });

    if ($('#slides').length > 0) {
        $('#slides').slideshow({
            randomize: false, // Randomize the play order of the slides.
            slideDuration: 4000, // Duration of each induvidual slide.
            fadeDuration: 2000, // Duration of the fading transition. Should be shorter than slideDuration.
            animate: true, // Turn css animations on or off.
            pauseOnTabBlur: false, // Pause the slideshow when the tab is out of focus. This prevents glitches with setTimeout().
            enableLog: false, // Enable log messages to the console. Useful for debugging.
        });
    }

    // floor plan slider
    $("#light-slider").lightSlider({
        item: 2,
        controls: true,
        pager: false,
        slideMargin: 20,
        enableTouch: false,
        enableDrag: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                item: 1
            }
        }, ]
    });

    $('[data-fancybox]').fancybox({
        youtube: {
            controls: 0,
            showinfo: 0
        },
        vimeo: {
            color: 'f00'
        },
        openEffect: 'elastic',
        closeEffect: 'elastic',
        openMethod: 'changeIn'
    });
    //back to top button
    var scrolltop_pos;
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#backTop').fadeIn();
            $(".navbar-light").addClass("light-bg-navbar");
        } else {
            $('#backTop').fadeOut();
            $(".navbar-light").removeClass("light-bg-navbar");
        }
        scrolltop_pos = $(this).scrollTop();
    });


    $('#backTop').click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1200);
    });



    // gallary page
    $('[data-fancybox="gallery"]').fancybox({
        protect: true,
        buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "thumbs",
            "close"
        ],
        transitionEffect: "fade",
        transitionDuration: 2000,
        fullScreen: {
            autoStart: true
        }
    });

    // floor-plan-gallary
    $('[data-fancybox="floor-plan-gallary"]').fancybox({
        buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "thumbs",
            "close"
        ],
        transitionEffect: "fade",
        transitionDuration: 2000,

    });

    // features text color
    function isDark(color) {
        var match = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(color);
        return (match[1] & 255) +
            (match[2] & 255) +
            (match[3] & 255) <
            3 * 256 / 2;
    }
    if ($(".color-text-features").length > 0) {
        var features_bg_color = $(".color-text-features").css("background-color");
        document.documentElement.style.setProperty("--docColor", isDark(features_bg_color) ? '#ffffff' : '#000000');
    }

    if ($(".features-bg").length > 0) {
        var doc_bg = $(".features-bg").css("background-color");
        document.documentElement.style.setProperty("--locationTitle", isDark(doc_bg) ? '#ffffff' : '#000000');
    }

    setVideoBGColor();

    function setVideoBGColor() {
        var featuresBackground = $(".features-bg").css("background-color");
        document.documentElement.style.setProperty("--featuresBackground", featuresBackground);
        var features_bg_color = $(".color-text-features").css("background-color");
        document.documentElement.style.setProperty("--videoBGColor", features_bg_color);
        var video_section_bg = Math.round($(".video-section-bg").height());
        var last_video_height = Math.round($(".htmlDiv").last().height() / 2);
        last_video_height = (video_section_bg - last_video_height);
        document.documentElement.style.setProperty("--smallDeviceamount", last_video_height + 'px');
        document.documentElement.style.setProperty("--fullHeight", video_section_bg + 'px');
    }
    // document section

    function openNav() {
        if ($(window).width() >= 767) {
            $(".sidenav-left").css("width", "40%");
            $(".sidenav-right").css("width", "60%");
        } else {
            $(".sidenav-left").css("width", "100%");
            $(".sidenav-right").css({
                "width": "100%",
                "opacity": "0.7"
            });
        }
        $("body").addClass("remove-scroll-body");
    }

    function closeNav() {
        $(".sidenav-left").css("width", "0px");
        $(".sidenav-right").css("width", "0px");
        $("body").removeClass("remove-scroll-body");
    }

    $("#open_doc").on("click", function() {
        openNav();
    });

    $(".closebtn").on("click", function() {
        closeNav();
    });

    // copy text
    $(".copy-btn").tooltip();

    function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }

    $(".copy-btn").on("click", function() {
        var element = $(this).parents("p").find(".copy-text");
        copyToClipboard(element);
        var tooltip = $(this).parents("p").find(".own-tooltip");
        tooltip.html("Copied: " + element.text());
        var $tip = $(".tooltip");
        $tip.find('.tooltip-inner').text("Copied: " + element.text());
    });

    $(".open-document-viewer").on("click", function() {
        var docurl = $(this).attr("data-href");
        window.open(docurl, "_blank");
        // PDFObject.embed(docurl, document.body);
    });


    // about the agents section modal
    $(document).on("click", ".agen-details", function() {
        var current = $(this).parents(".bg-agents");
        var agent_details_array = [{
                sectionElement: current.find(".agent-img"),
                modalElement: $(".show-agent-img"),
                value: $.trim(current.find(".agent-img").attr("src"))
            },
            {
                sectionElement: current.find(".name-agent"),
                modalElement: $(".show-agent-name"),
                value: $.trim(current.find(".name-agent").text())
            },
            {
                sectionElement: current.find(".agent-logo"),
                modalElement: $(".show-agent-logo"),
                value: $.trim(current.find(".agent-logo").attr("src"))
            },
            {
                sectionElement: current.find(".agent-number"),
                modalElement: $(".show-agent-number"),
                value: $.trim(current.find(".agent-number").text())
            },
            {
                sectionElement: current.find(".agent-email"),
                modalElement: $(".show-agent-email"),
                value: $.trim(current.find(".agent-email").text())
            },
            {
                sectionElement: current.find(".agent-dre"),
                modalElement: $(".show-agent-dre"),
                value: $.trim(current.find(".agent-dre").text())
            },
            {
                sectionElement: current.find(".agent-website"),
                modalElement: $(".show-agent-website"),
                value: $.trim(current.find(".agent-website").attr("href"))
            },
            {
                sectionElement: current.find(".agent-facebook"),
                modalElement: $(".show-agent-facebook"),
                value: $.trim(current.find(".agent-facebook").attr("href"))
            },
            {
                sectionElement: current.find(".agent-instagram"),
                modalElement: $(".show-agent-instagram"),
                value: $.trim(current.find(".agent-instagram").attr("href"))
            },
            {
                sectionElement: current.find(".agent-linkedin"),
                modalElement: $(".show-agent-linkedin"),
                value: $.trim(current.find(".agent-linkedin").attr("href"))
            }
        ];
        for (var i = 0; i < agent_details_array.length; i++) {
            if (agent_details_array[i].sectionElement.length == 0 || agent_details_array[i].value == "") {
                agent_details_array[i].modalElement.addClass('d-none');
            } else {
                agent_details_array[i].modalElement.removeClass('d-none');
            }
        }
        var agent_img = current.find(".agent-img").attr("src");
        var agent_name = current.find(".name-agent").text();
        var agent_logo = current.find(".agent-logo").attr("src");
        var agent_number = current.find(".agent-number").text();
        var agent_email = current.find(".agent-email").text();
        var agent_dre = current.find(".agent-dre").text();
        var agent_website = current.find(".agent-website").attr("href");
        var agent_facebook = current.find(".agent-facebook").attr("href");
        var agent_instagram = current.find(".agent-instagram").attr("href");
        var agent_linkedin = current.find(".agent-linkedin").attr("href");
        var agent_discreption = current.find(".discreption-agent").html();
        $(".show-agent-img").attr("src", agent_img);
        $(".show-agent-name").text(agent_name);
        $(".show-agent-logo").attr("src", agent_logo);
        $(".show-agent-number").text(agent_number);
        $(".show-agent-email").text(agent_email);
        $(".show-agent-dre").text(agent_dre);
        $(".show-agent-website").attr("href", agent_website);
        $(".show-agent-facebook").attr("href", agent_facebook);
        $(".show-agent-instagram").attr("href", agent_instagram);
        $(".show-agent-linkedin").attr("href", agent_linkedin);
        $(".show-agent-discription").html(agent_discreption);
    });

    if ($('.features-discription').length > 0) {
        const features_discription = document.querySelector('.features-discription');
        const ps_features_discription = new PerfectScrollbar(features_discription);
    }
    if ($('.Showing-date-section').length > 0) {
        const Showing_date_section = document.querySelector('.Showing-date-section');
        const ps_Showing_date_section = new PerfectScrollbar(Showing_date_section);
    }
    if ($('.online-Showing-date-section').length > 0) {
        const online_Showing_date_section = document.querySelector('.online-Showing-date-section');
        const ps_online_Showing_date_section = new PerfectScrollbar(online_Showing_date_section);
    }
    if ($('#scrollbar').length > 0) {
        var demoDiv = document.getElementById('scrollbar');
        const ps = new PerfectScrollbar(demoDiv);
    }
    if ($(".video-section-bg").length == 0 && $(".document-section-bg").length == 0) {
        $("#location").removeClass("mt-5");
    }
    if ($(".all-videos").length == 0) {
        $(".features-section").addClass("col-12");
        $(".features-section").removeClass("col-lg-9 col-sm-8 pr-3 pr-sm-5");
        var backcolor = $(".color-text-features").css('background-color');
        $(".video-section-bg").css('background', backcolor);
        $(".video-section-bg").removeClass('pl-sm-5').addClass('px-sm-5');
    }
    if ($(".showing-section").length == 0) {
        $(".zoom-section-guideline").addClass("text-center");
    }
});