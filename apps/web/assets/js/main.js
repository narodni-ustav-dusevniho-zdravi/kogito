$(document).ready(function () {
    // obecne
    var bodyWidth = window.innerWidth;

    // události při resize okna
    $(window).on('resize', function () {
        // osetreni, zda se velikost zmenila
        if (bodyWidth !== window.innerWidth) {
            // nastavíme novou šířku
            bodyWidth = window.innerWidth;
            // zresetuj menu
            resetMenu();
        }
    });

    // mobilní menu
    function switchMenu() {
        // označíme zda je menu zavřeno či nikoliv
        if ($('.nav-switcher').hasClass('is-open')) {
            $('.nav-switcher, .nav').removeClass('is-open');
            $('body').removeClass('is-unscrollable');
        } else {
            $('.nav-switcher, .nav').addClass('is-open');
            $('body').addClass('is-unscrollable');
        }
    }
    // při změně rozlišení resetujeme menu
    function resetMenu() {
        $('.nav-switcher, .nav').removeClass('is-open');
        $('body').removeClass('is-unscrollable');
    }
    // spouštěč
    $('.nav-switcher').on('click', function () {
        switchMenu();
    });

    // události při načtení stránky
    $(window).on('load', function () {
        // AOS fix pro první načítání
        // AOS.refresh();
    });

    // události při scroolování
    $(window).on('scroll', function () {
        //...
    });

    // modal okna
    if ($('.modal').length) {
        modal();
    }

    // youtube video v modálním okně
    if ($('.js-video-start').length) {
        //new ModalVideo('.js-video-start', { channel: 'youtube' });
        $('.js-video-start').modalVideo({
            youtube: {
                controls: 1,
                autoplay: 1,
            },
        });
    }

    // galerie
    if ($('.gallery').length) {
        $('.gallery a').simpleLightbox({
            showCounter: false,
        });
    }
});
