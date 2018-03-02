import tournament from './modules';
import { popup } from './modules/popup';

tournament().then(r => {
  popup();

  let currentRound = r.slice(-1);
  $(`[class*="${currentRound}"]`).addClass('current');

  if (!$('[class*="round1"]').hasClass('current')) {
    $('.current .team').each(function() {
      let prevMatchup = $(this)
        .parents()
        .find('[class*="round"]:not(.current) .matchup .team');

      for (let each of prevMatchup) {
        if (each.innerText === this.innerText) $(each).addClass('winner');
      }
    });
  }

  if (window.innerWidth <= 700) {
    $(window).scroll(function() {
      let scroll = document
        .querySelector('.logo-container')
        .getBoundingClientRect();
      if (scroll.bottom < 0) {
        $('.how-to').addClass('how-to_visible');
      } else {
        $('.how-to').removeClass('how-to_visible');
      }
    });
  }
});
