import tournament from './modules'
import { popup } from './modules/popup'

tournament()
.then(r => {

  popup();

  let currentRound = r.slice(-1);
  $(`[class*="${currentRound}"]`).addClass('current');

  if (!$('[class*="round1"]').hasClass('current')) {
    $('.current .team').each(function() {
      let prevMatchup = $(this)
        .parents()
        .find('[class*="round"]:not(.current) .matchup .team');

      for (let each of prevMatchup) {
        if (each.innerText === this.innerText) $(each).addClass('winner')
      }
    });
  }
});
