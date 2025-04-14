 // When the document is ready
 $(document).ready(function() {
     if ($("#player-control").length != 0) {
         var youtube_url = $("#player-control").attr("data-youtube-id");
         // Initialize YouTube player
         $("#player-control").YTPlayer({
             // URL of the YouTube video
             videoURL: youtube_url,
             // If you want it as background of your website
             // or of an element e.g #elementId
             containment: ".header",
             autoplay: false,
             mute: true,
             startAt: 0,
             opacity: 1,
             vq: 'hd1080',
             loop: true,
             // Hide YouTube Controls
             showControls: false,
             stopMovieOnBlur: false,
             onReady: function() {
                 $("#player-control").YTPPlay();
                 $(".dark-bg").fadeOut(3000);
                 setTimeout(function() {
                     $(".fixed-top").addClass("top-bar-style");
                     $(".bottom-header").addClass("bottom-header-style");
                 }, 100);
                 console.log("Player succesfully initialized");
             },
             onError: function(err) {
                 console.log("An error ocurred", err);
             }
         });
     }

 });
 $(window).on('load', function() {
     if ($(".bg-iframe").length > 0) {
         $(".fixed-top").addClass("top-bar-style");
         $(".bottom-header").addClass("bottom-header-style");
         $(".dark-bg").remove();
     }


 });