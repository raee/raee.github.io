/*
 Theme: Flatfy Theme
 Author: Andrea Galanti
 Bootstrap Version
 Build: 1.0
 http://www.andreagalanti.it
 */

$(window).load(function () {
    //Preloader
    $('#status').delay(300).fadeOut();
    $('#preloader').delay(300).fadeOut('slow');
    $('body').delay(550).css({'overflow': 'visible'});
})

$(document).ready(function () {
    //animated logo
    $(".navbar-brand").hover(function () {
        $(this).toggleClass("animated shake");
    });

    //animated scroll_arrow
    $(".img_scroll").hover(function () {
        $(this).toggleClass("animated infinite bounce");
    });

    //Wow Animation DISABLE FOR ANIMATION MOBILE/TABLET
    wow = new WOW(
        {
            mobile: false
        });
    wow.init();

    //MagnificPopup
    $('.image-link').magnificPopup({type: 'image', removalDelay: 300, mainClass: 'mfp-fade'});


    // OwlCarousel N1
    $("#owl-demo").owlCarousel({
        autoPlay: 3000,
        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
    });

    $("#owl-cnblogs").owlCarousel({
        autoPlay: 3000,
        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
    });

    // OwlCarousel N2
    // $("#owl-hgxwp").owlCarousel({
    //     autoPlay: 3000,
    //     navigation: false, // Show next and prev buttons
    //     slideSpeed: 300,
    //     paginationSpeed: 400,
    //     singleItem: true
    // });

    // $("#owl-nfzd").owlCarousel({
    //     autoPlay: 3000,
    //     navigation: false, // Show next and prev buttons
    //     slideSpeed: 300,
    //     paginationSpeed: 400,
    //     singleItem: true
    // });

    //SmothScroll
    $('a[href*=#]').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({scrollTop: targetOffset}, 600);
                return false;
            }
        }
    });

    //Subscribe
    var morphButton = document.querySelector('.morph-button');
    if (morphButton) {
        new UIMorphingButton(morphButton);
    }
    // for demo purposes only
    [].slice.call(document.querySelectorAll('form button')).forEach(function (bttn) {
        bttn.addEventListener('click', function (ev) {
            ev.preventDefault();
        });
    });

});

var scrollTo = function (selector) {

    var $target = $(selector);
    if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body').animate({scrollTop: targetOffset}, 600);
        return false;
    }
}

var initVideo = function () {
    var sphVideo = $('#video_sph')[0];

    sphVideo.onplay = function () {

        // 停止音乐
        var bgAudio = $('#bg-audio')[0];
        if (!bgAudio.paused) {
            bgAudio.pause();
            stopRotation();
        }


        $('#video_play').hide();
        $('#video_paused').show();

    };

    sphVideo.onpause = function () {
        $('#video_play').show();
        $('#video_paused').hide();
    };

    $('#video_sph').bind({
        mouseover: function () {
            toggleVideoState();
        },
        mousemove: function () {
            toggleVideoState();
        },
        mouseout: function () {
            toggleVideoState(true);
        },
        click: function () {
            toggleVideoState();
        }
    });
    $('#video_play').bind({
        click: function () {
            playVideo(sphVideo);
        }
    });
    $('#video_paused').bind({
        click: function () {
            playVideo(sphVideo);
        }
    });
};

var videoStateTimeout;

var toggleVideoState = function (isOut) {

    clearTimeout(videoStateTimeout);

    var video = $("#video_sph")[0];

    $('.video-controller').show();

    // if (video.played.length <= 0 || video.paused) {
    //     $('#video_play').show();
    //     $('#video_paused').hide();
    // } else {
    //     $('#video_play').hide();
    //     $('#video_paused').show();
    // }

    videoStateTimeout = setTimeout(function () {
        if (video.paused) return;
        $('.video-controller').fadeOut();
    }, 3000);
}

var playVideo = function () {

    var video = $("#video_sph")[0];


    if (video.played.length <= 0 || video.paused) {
        video.play();
    } else {
        video.pause();
    }

    scrollTo('#sph-video');

}

var playVideoClick = function () {
    $("#video_sph")[0].play();
}

var playMusic = function () {
    var bgAudio = $('#bg-audio')[0];
    if (bgAudio.paused) {
        bgAudio.play();
    } else {
        bgAudio.pause();
    }
}

var musicRotation = function () {

    $(".bg-music").rotate({
        angle: getRotateAngle($(this)),
        animateTo: 360,
        callback: musicRotation,
        easing: function (x, t, b, c, d) {        // t: current time, b: begInnIng value, c: change In value, d: duration
            return c * (t / d) + b;
        },
        bind: {
            click: function () {
                playMusic();
            },
            mouseover: function () {
                stopRotation();
            },
            mouseout: function () {
                var bgAudio = $('#bg-audio')[0];
                if (bgAudio.paused) {
                    stopRotation();
                    $(this).rotate(0);
                    return;
                }
                musicRotation();
            }
        }
    });
}

var stopRotation = function () {
    $(".bg-music").stopRotate();
}

var getRotateAngle = function (e) {
    var rotate = $(e).getRotateAngle();
    if (!rotate || rotate <= 0 || rotate >= 360) return 0;
    return rotate;
}


