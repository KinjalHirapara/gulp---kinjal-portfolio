$(document).ready(function() {
    var repflag = false;
    var repsize = 1500;

    function insertCut(selector, count) {
        var oldcount = count;
        if (selector.get(0).nodeType == 3) {
            count += selector.text().length;
            if (count > repsize) {
                var txt = selector.text();
                // Begin Insertion Process for features cut
                if (oldcount <= repsize && !repflag) {
                    var range = repsize - oldcount;
                    var str1 = txt.substring(0, range);
                    var str2 = txt.substring(range);
                    if (str2.indexOf(" ") > 0) {
                        str2 = str2.replace(" ", '<span class="d-inline-block features-cut"></span> ')
                    } else {
                        str2 += '<span class="d-inline-block features-cut"></span>';
                    }
                    var strnew = str1 + str2;
                    repflag = true;
                    selector.replaceWith(strnew);
                }
            }
        } else {
            selector.contents().each(function() {
                count = insertCut($(this), count);
            })
        }

        return count;

    }

    if ($('.features-text-wrap').height() < 300) {
        $('.features-wrapper').addClass('fullvisible');
        $('.features-buttons').hide();
    } else {
        var parentx = $('.features-text-wrap');
        var featureCount = insertCut(parentx, 0);
        if (featureCount < repsize) {
            $('.features-wrapper').addClass('fullvisible');
            $('.features-buttons').hide();
        } else {

            var selectorx = $('.features-text-wrap').find('.features-cut');
            var dx = parentx.offset().top;
            var cx = (selectorx.offset().top) + 10;
            var hx = cx - dx;

            $('.features-wrapper').removeClass('fullvisible');
            $('.features-text').css('max-height', hx + 'px');
            $('.features-buttons').show();


            $('.features-expand').click(function() {
                $('.features-wrapper').addClass('fullvisible');
                $('.features-text').css('max-height', '100%');
                window.setTimeout(function() {
                    $('.features-text').css('max-height', 'none');
                    $(window).trigger('resize.px.parallax');
                }, 100)

            });
            $('.features-collapse').click(function() {
                $('.features-wrapper').removeClass('fullvisible');
                $('.features-text').css('max-height', hx + 'px');
                window.setTimeout(function() {
                    $(window).trigger('resize.px.parallax');
                }, 200);
                // $(window).scrollTop($('#features .features-wrapper').offset().top - 80);
                $('html,body').animate({
                        scrollTop: ($('#section-feature').offset().top - 80)
                    },
                    'slow');
            })
        }
    }
});