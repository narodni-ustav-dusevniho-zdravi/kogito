function start_circle() {
  const displays = document.querySelectorAll('.note-display');
  const transitionDuration = 900;
  displays.forEach(function (display) {
    var note = parseFloat(display.dataset.note);
    strokeTransition(display, note);
  });
  function strokeTransition(display, note) {
    var progress = display.querySelector('.circle__progress--fill');
    var radius = progress.r.baseVal.value;
    var circumference = 2 * Math.PI * radius;
    var offset = circumference * (10 - note) / 10;
    progress.style.setProperty('--initialStroke', circumference);
    progress.style.setProperty('--transitionDuration', "".concat(transitionDuration, "ms"));
    setTimeout(function () {
      return progress.style.strokeDashoffset = offset;
    }, 100);
  }
}

function start_count() {
  $('.counter--number').each(function () {
    $(this)
      .prop('Counter', 0)
      .animate(
        {
          Counter: $(this).data('number'),
        },
        {
          duration: 3000,
          easing: 'swing',
          step: function (now) {
            $(this).text(Math.ceil(now).toLocaleString('cs'));
          },
        }
      );
  });
}
