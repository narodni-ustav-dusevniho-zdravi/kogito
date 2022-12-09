let contactSubmit = {
    submitButton: $('#question_submit'),
    fullNameInput: $('#question_fullName'),

    init: function () {
        this.form = this.submitButton.closest('form');
        toastr.options.positionClass = 'toast-bottom-center';

        let app = this;
        this.submitButton.on('click', function (event) {
            if (app.form[0].checkValidity()) {
                event.preventDefault();
                app.submitForm(app.form.serialize());
            }
        });

        this.fullNameInput.keyup(function () {
            $(this).val($(this).val().replace(/\d+/, ''));
        });
    },
    submitForm: function (serializedForm) {
        let app = this;
        $.ajax({
            url: this.form.attr('action'),
            method: 'POST',
            data: serializedForm,
            beforeSend: function () {
                app.disableButton(true);
            },
            success: function (response) {
                app.showMessage('Zpráva byla úspěšně odeslána', 'success');
            },
            error: function (response) {
                app.showMessage('Při odesílání zprávy došlo k chybě!', 'error');
            },
            complete: function (jqXHR, status) {
                app.enableButton();
                app.form[0].reset();
            },
        });
    },
    showMessage: function (message, type) {
        toastr[type](message);
    },
    disableButton: function () {
        this.submitButton.attr('disabled', 'disabled');
    },
    enableButton: function () {
        this.submitButton.attr('disabled', false);
    },
};

$(function () {
    contactSubmit.init();
});
