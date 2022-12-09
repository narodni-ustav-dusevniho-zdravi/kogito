// modal okna
function modal() {
    // otevření okna
    $('.js-modal-open').on('click', function () {
        // zjištění ID okna z atributu rel
        let modalName = $(this).attr('href');

        // otevření okna
        $(modalName).addClass('is-open');
        $('body').addClass('is-unscrollable');

        playModalVideo(modalName);
    });

    // zavření modal okna
    $('.js-modal-close').on('click', function (event) {
        event.preventDefault();
        $(this).closest('.modal').removeClass('is-open');
        $('body').removeClass('is-unscrollable');
        pauseModalVideo();
    });

    // zavření okna kliknutím na pozadí
    $('.modal:not(.modal__full):not(.modal--confirmation)').on('click', function (event) {
        event.preventDefault();
        $(this).removeClass('is-open');
        $('body').removeClass('is-unscrollable');
        pauseModalVideo();
    });

    // zamezení zavření po kliknutí na tělo modalu
    $('.modal__body').on('click', function (event) {
        event.stopPropagation();
    });

    function pauseModalVideo() {
        if (document.querySelectorAll('video').length) {
            document.querySelectorAll('video').forEach(function (video) {
                video.pause();
            });
        }
    }

    function playModalVideo(modalName) {
        if (document.querySelectorAll(modalName + ' video').length) {
            document.querySelectorAll(modalName + ' video').forEach(function (video) {
                video.play();
            });
        }
    }
}
