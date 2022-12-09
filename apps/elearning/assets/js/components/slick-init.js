$(document).ready(function () {
    $('.reviews--slider--4').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        centerMode: true,
        centerPadding: '30px',
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '0',
                },
            },
        ],
    });
    $('.reviews--slider--3').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    });
    $('.reviews--slider--2').slick({
        slidesToShow: 1,
        variableWidth: true,
        slidesToScroll: 1,
        speed: 1000,
        arrows: true,
        dots: false,
        centerMode: true,
        centerPadding: '30px',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false,
                    centerPadding: '0',
                },
            },
        ],
    });
    $('.reviews .slick-prev').click(function () {
        $('.reviews--slider').slick('slickPrev');
    });
    $('.reviews .slick-next').click(function () {
        $('.reviews--slider').slick('slickNext');
    });

    $('.hero-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
    });
    $('.hero-slider-nav').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        dots: false,
        fade: true,
        arrows: false,
        focusOnSelect: true,
    });
    $('.hero .slick-prev').click(function () {
        $('.hero-slider').slick('slickPrev');
        $('.hero-slider-nav').slick('slickPrev');
    });
    $('.hero .slick-next').click(function () {
        $('.hero-slider').slick('slickNext');
        $('.hero-slider-nav').slick('slickNext');
    });
    // $('.hero-slider-nav').on(
    //   'afterChange',
    //   function (event, slick, currentSlide, nextSlide) {
    // console.log('----------');
    // console.log(currentSlide);
    // console.log(nextSlide);
    // let maxSliderIndex = slick.slideCount;
    // if (currentSlide) {
    // console.log('start');
    // $('.hero-slider').slick('slickGoTo', 0);
    // } else {
    // console.log('next');
    // }
    // $('.hero-slider').slick('slickGoTo', nextSlide);
    // }
    // );

    // let time = 7;
    // let $bar, $slick, isPause, tick, percentTime;
    // $slick = $('.carousel--slider');
    // $slick.on('init', function (event, slick) {
    //   $('.slider-progress--slide--max').html('0' + slick.slideCount);
    // });
    // $slick.slick({
    //   dots: false,
    //   pauseOnDotsHover: true,
    //   mobileFirst: true,
    //   infinite: true,
    //   arrows: false,
    //   // fade: true,
    //   draggable: true,
    // });
    // $bar = $('.slider-progress .progress');
    // $('.homepage-header--slider--text').on({
    //   mouseenter: function () {
    //     isPause = true;
    //   },
    //   mouseleave: function () {
    //     isPause = false;
    //   },
    // });
    // $slick.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    //   // startProgressbar();
    //   $('.slider-progress--slide--current').html('0' + (nextSlide + 1));
    // });
    // function startProgressbar() {
    //   resetProgressbar();
    //   percentTime = 0;
    //   isPause = false;
    //   tick = setInterval(interval, 10);
    // }
    // function interval() {
    //   if (isPause === false) {
    //     percentTime += 1 / (time + 0.1);
    //     $bar.css({
    //       width: percentTime + '%',
    //     });
    //     if (percentTime >= 100) {
    //       $slick.slick('slickNext');
    //       startProgressbar();
    //     }
    //   }
    // }
    // function resetProgressbar() {
    //   $bar.css({
    //     width: 0 + '%',
    //   });
    //   clearTimeout(tick);
    // }
    // startProgressbar();
});
