// modal okna
function modal() {
    // otevření okna
    $('.js-modal-open').on('click', function () {
        // zjištění ID okna z atributu rel
        let modalName = $(this).attr('href');

        // otevření okna
        $(modalName).addClass('is-open');

        if ($(modalName).find('.video').length) {
            $(modalName).find('.video').trigger('play');
        }

        $('body').addClass('is-unscrollable');
    });

    // zavření modal okna
    $('.js-modal-close').on('click', function (event) {
        event.preventDefault();
        $(this).closest('.modal').removeClass('is-open');
        $('body').removeClass('is-unscrollable');

        if ($(this).closest('.modal').find('.video').length) {
            $(this).closest('.modal').find('.video').get(0).pause();
            $(this).closest('.modal').find('.video').get(0).currentTime = 0;
        }
    });

    // zavření okna kliknutím na pozadí
    $('.modal').on('click', function (event) {
        event.preventDefault();
        $(this).removeClass('is-open');
        $('body').removeClass('is-unscrollable');

        if ($(this).find('.video').length) {
            $(this).find('.video').get(0).pause();
            $(this).find('.video').get(0).currentTime = 0;
        }
    });

    // zamezení zavření po kliknutí na tělo modalu
    $('.modal__body').on('click', function (event) {
        event.stopPropagation();
    });
}
