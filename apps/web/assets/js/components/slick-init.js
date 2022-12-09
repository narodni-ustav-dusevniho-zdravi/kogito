$(document).ready(function () {
    $('.recent-articles--slider').slick({
        infinite: true,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: $('.recent-articles--prev'),
        nextArrow: $('.recent-articles--next'),
        variableWidth: true,
    });
});
