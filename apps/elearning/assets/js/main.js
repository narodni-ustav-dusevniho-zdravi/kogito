$(document).ready(function () {
    // obecne
    let bodyWidth = window.innerWidth;
    let scroll = $(window).scrollTop();
    let mainHeader = document.querySelector('.header');

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

    // spouštěč
    $('.nav li a').on('click', function () {
        if (window.innerWidth < 960) {
            switchMenu();
        }
    });

    $('.js-media-show').on('click', function () {
        $('.media--row').css('display', 'grid');
        $(this).hide();
    });

    $('#js-cookies-button').on('click', function () {
        $('#js-cookies').hide();
        cookiesAccept();
    });

    function cookiesAccept() {
        let date = new Date();
        date.setFullYear(date.getFullYear() + 10);
        document.cookie = 'eu-cookies=1; path=/; expires=' + date.toGMTString();
    }

    // stránka /poskytuji-peci a nutnost souhlasit s podmínkami před vstupem na stránku
    $('.js-modal-provider-confirmation').on('click', function () {
        if (
            document.getElementById('for-professionals-checkbox1').checked &&
            document.getElementById('for-professionals-checkbox2').checked
        ) {
            $('#modal-provider-confirmation').removeClass('is-open');
            $('body').removeClass('is-unscrollable');
            careProviderAccept();
        } else {
            $('.js-modal-provider-error').removeClass('is-hidden');
        }
    });
    $('.js-modal-close-confirmation').on('click', function () {
        if (document.referrer === '') {
            window.location.href = '/';
        } else {
            history.back();
        }
    });

    function careProviderAccept() {
        let date = new Date();
        date.setFullYear(date.getFullYear() + 10);
        document.cookie = 'for-professionals-accept=1; path=/; expires=' + date.toGMTString();
    }

    // události při načtení stránky
    $(window).on('load', function () {
        // AOS fix pro první načítání
        AOS.refresh();
        headerScroll();

        if ($('.counter').length) {
            let oTop = $('.counter').offset().top - window.innerHeight / 1.5;
            let onlyOnce = true;

            if (onlyOnce) {
                if (0 > oTop) {
                    let pTop = $(window).scrollTop();
                    if (pTop > oTop) {
                        onlyOnce = false;
                        start_count();
                    }
                } else {
                    $(window).scroll(function () {
                        let pTop = $(window).scrollTop();
                        if (pTop > oTop) {
                            onlyOnce = false;
                            start_count();
                        }
                    });
                }
            }
        }

        if ($('.modal-video-on-load').length) {
            var hash = window.location.hash.substr(1);
            $('#' + hash).addClass('is-open');
        }
    });

    // události při scroolování
    $(window).on('scroll', function () {
        headerScroll();
    });

    function headerScroll() {
        scroll = $(window).scrollTop();
        if (scroll > 0) {
            mainHeader.classList.add('is-scroll');
        } else {
            mainHeader.classList.remove('is-scroll');
        }
    }

    // modal okna
    if ($('.modal').length) {
        modal();
    }

    // video sekce
    if ($('.video-section').length) {
        $('.video-section__slider').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });
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

    // vimeo video v modálním okně
    if ($('.js-vimeo-start').length) {
        $('.js-vimeo-start').modalVideo({ channel: 'vimeo' });
    }

    // galerie
    if ($('.gallery').length) {
        $('.gallery a').simpleLightbox({
            showCounter: false,
        });
    }
});
