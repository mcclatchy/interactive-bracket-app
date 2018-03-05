import appendBracket from './modules';
import { popup } from './modules/popup';
import getSheet from './modules/getSheet';

getSheet().then(sheet => {

  let round = appendBracket(sheet);

  popup();

  let currentRound = round.slice(-1);
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
      let el = $('.how-to')
      if (scroll.bottom < 80) {
        el.addClass('how-to_visible');
      } else {
        el.removeClass('how-to_visible');
      }
    });
  }
  else {
    $('.how-to > p > span').text('Click');
  }
});
