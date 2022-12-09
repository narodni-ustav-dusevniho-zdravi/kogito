document.addEventListener('DOMContentLoaded', function () {
    const form = document.forms['contact-phone'];
    const input = form.querySelector(['input']);
    const submitButton = form.querySelector('input[type="submit"]');
    const messageBox = form.querySelector('.js-message');

    const clearMessage = () => {
        messageBox.classList.add('js-hidden');
        messageBox.classList.remove('js-success', 'js-error');
        messageBox.innerText = '';
        submitButton.classList.remove('js-hidden');
    };

    const showMessage = (state, message) => {
        submitButton.classList.add('js-hidden');

        messageBox.innerText = message;
        messageBox.classList.remove('js-hidden', 'js-success', 'js-error');
        messageBox.classList.add('js-' + state);

        setTimeout(clearMessage, 3000);
    };

    input.addEventListener('change', function () {
        clearMessage();
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var xhr = new XMLHttpRequest();
        xhr.open('POST', form.getAttribute('action'));
        xhr.send(new FormData(form));

        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.ok) {
                    showMessage('success', 'Děkujeme! Brzy se ozveme');
                    form.reset();
                } else {
                    showMessage('error', 'Číslo neni validní. Prosím vypňte platné telefonní číslo.');
                }
            }
        };

        xhr.onerror = function () {};
    });
});
