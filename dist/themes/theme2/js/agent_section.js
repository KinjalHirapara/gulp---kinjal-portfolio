$(document).ready(function() {

    var repsize_agent = 800;

    function insertCut(selector, count, repflag) {
        var oldcount = count;
        if (selector.get(0).nodeType == 3) {
            count += selector.text().length;
            if (count > repsize_agent) {
                var txt = $.trim(selector.text());
                // Begin Insertion Process for features cut
                if (oldcount <= repsize_agent && !repflag) {
                    var range = repsize_agent - oldcount;
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
                count = insertCut($(this), count, repflag);
            })
        }

        return count;

    }

    if ($('.agent-bio-info').length > 0) {
        $('.agent-bio-info').each(function() {
            var current = $(this);
            var repsize_agent = 800;
            if (current.find('.agent-bio-text-wrap').height() < 200) {
                current.find('.agent-bio-wrapper').addClass('fullvisible');
                current.find('.agent-bio-buttons').hide();
            } else {
                var parent_agent = current.find('.agent-bio-text-wrap');
                var agentCount = insertCut(parent_agent, 0, false);
                if (agentCount < repsize_agent) {
                    current.find('.agent-bio-wrapper').addClass('fullvisible');
                    current.find('.agent-bio-buttons').hide();
                } else {

                    var selectoragent = current.find('.agent-bio-text-wrap').find('.features-cut');
                    var d_agent = parent_agent.offset().top
                    var c_agent = (selectoragent.offset().top) + 10;
                    var h_agent = c_agent - d_agent;

                    current.find('.agent-bio-wrapper').removeClass('fullvisible');
                    current.find('.agent-bio-text').css('max-height', h_agent + 'px');
                    current.find('.agent-bio-buttons').show();
                    current.find('.agent-bio-expand').click(function() {
                        current.find('.agent-bio-wrapper').addClass('fullvisible');
                        current.find('.agent-bio-text').css('max-height', '100%');
                        window.setTimeout(function() {
                            current.find('.agent-bio-text').css('max-height', 'none');
                            $(window).trigger('resize.px.parallax');
                        }, 100);
                        AOS.refresh();
                    })
                    current.find('.agent-bio-collapse').click(function() {
                        current.find('.agent-bio-wrapper').removeClass('fullvisible');
                        current.find('.agent-bio-text').css('max-height', h_agent + 'px');
                        window.setTimeout(function() {
                            $(window).trigger('resize.px.parallax');
                        }, 200);
                        $('html,body').animate({
                                scrollTop: current.parents('.agents-row').offset().top
                            },
                            500);
                        AOS.refresh();
                    })
                }
            }
        });

    }
});