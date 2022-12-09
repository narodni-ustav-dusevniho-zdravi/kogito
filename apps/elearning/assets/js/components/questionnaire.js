let questionnaireEPDS = document.querySelectorAll('.questionnaire--questions-1');
let questionnaireEPDSIntro = document.querySelector('#test-epds .questionnaire__intro');
let questionnaireEPDSQuestions = document.querySelector('#test-epds .questionnaire__questions');
let questionnaireEPDSEvaluation = document.querySelector('#test-epds .questionnaire__evaluation');

let questionnairePASS = document.querySelectorAll('.questionnaire--questions-2');
let questionnairePASSIntro = document.querySelector('#test-pass .questionnaire__intro');
let questionnairePASSQuestions = document.querySelector('#test-pass .questionnaire__questions');
let questionnairePASSEvaluation = document.querySelector('#test-pass .questionnaire__evaluation');

let questionnaireQuestion = '0';

function startQuestionnaire(questions) {
    questionnaireQuestion = '0';
    if (questions === 'epds') {
        questionnaireEPDSIntro.classList.add('is-hidden');
        questionnaireEPDSQuestions.classList.remove('is-hidden');
        questionnaireEPDS[0].classList.add('is-open');
        questionnaireEPDSQuestions.setAttribute('question', questionnaireQuestion);
    } else {
        questionnairePASSIntro.classList.add('is-hidden');
        questionnairePASSQuestions.classList.remove('is-hidden');
        questionnairePASS[0].classList.add('is-open');
        questionnairePASSQuestions.setAttribute('question', questionnaireQuestion);
    }
}

function nextQuestionnaire(questions) {
    event.preventDefault();

    if (questions === 'epds') {
        for (let radioInput of questionnaireEPDS[questionnaireQuestion].querySelectorAll('input[type=radio]')) {
            if (radioInput.checked) {
                document.querySelector('#test-epds .is-open .is-error').style.opacity = '0';
                questionnaireQuestion = parseInt(questionnaireQuestion) + 1;
                if (parseInt(questionnaireEPDSQuestions.getAttribute('question')) < questionnaireEPDS.length - 1) {
                    questionnaireEPDSQuestions.setAttribute('question', questionnaireQuestion.toString());
                    questionnaireEPDS[questionnaireQuestion - 1].classList.remove('is-open');
                    questionnaireEPDS[questionnaireQuestion].classList.add('is-open');
                } else {
                    finishQuestionnaire('epds');
                }
                return;
            } else {
                document.querySelector('#test-epds .is-open .is-error').style.opacity = '1';
            }
        }
    } else {
        for (let radioInput of questionnairePASS[questionnaireQuestion].querySelectorAll('input[type=radio]')) {
            if (radioInput.checked) {
                document.querySelector('#test-pass .is-open .is-error').style.opacity = '0';
                questionnaireQuestion = parseInt(questionnaireQuestion) + 1;
                if (parseInt(questionnairePASSQuestions.getAttribute('question')) < questionnairePASS.length - 1) {
                    questionnairePASSQuestions.setAttribute('question', questionnaireQuestion.toString());
                    questionnairePASS[questionnaireQuestion - 1].classList.remove('is-open');
                    questionnairePASS[questionnaireQuestion].classList.add('is-open');
                } else {
                    finishQuestionnaire('pass');
                }
                return;
            } else {
                document.querySelector('#test-pass .is-open .is-error').style.opacity = '1';
            }
        }
    }
}
function prevQuestionnaire(questions) {
    event.preventDefault();
    questionnaireQuestion = parseInt(questionnaireQuestion) - 1;

    if (questions === 'epds') {
        questionnaireEPDSQuestions.setAttribute('question', questionnaireQuestion.toString());
        questionnaireEPDS[questionnaireQuestion + 1].classList.remove('is-open');
        questionnaireEPDS[questionnaireQuestion].classList.add('is-open');
    } else {
        questionnairePASSQuestions.setAttribute('question', questionnaireQuestion.toString());
        questionnairePASS[questionnaireQuestion + 1].classList.remove('is-open');
        questionnairePASS[questionnaireQuestion].classList.add('is-open');
    }
}

function finishQuestionnaire(questions) {
    if (questions === 'epds') {
        $.ajax({
            url: '/api/epds',
            type: 'post',
            data: $('#epds-form').serialize(),
            dataType: 'json',
            success: function (data) {
                $('#epdsResult').html($.parseJSON(data));
                questionnaireEPDSQuestions.classList.add('is-hidden');
                questionnaireEPDSEvaluation.classList.remove('is-hidden');
            },
        });
    } else {
        $.ajax({
            url: '/api/pass',
            type: 'post',
            data: $('#pass-form').serialize(),
            dataType: 'json',
            success: function (data) {
                $('#passResult').html($.parseJSON(data));
                questionnairePASSQuestions.classList.add('is-hidden');
                questionnairePASSEvaluation.classList.remove('is-hidden');
            },
        });
    }
}
