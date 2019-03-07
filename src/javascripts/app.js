import appendBracket from './modules';
import bracket from './modules/bracket.json';
import { popup } from './modules/popup';
import { svg } from './modules/svg';
import { addFinal } from './modules/helpers';

function override() {
  // Disables default site styles
  document.querySelector(
    'link[href*="/wps/build/css/"]'
  ).disabled = true;
  // removes unnecssary DOM elements
  let toRemove = [
    'header',
    '#footer2018',
    'nav#mainNav',
    '#wallpaperWrapper',
    '#floorboard',
    '.overlay'
  ];

  for (const each of toRemove) {
    document.querySelector(each).remove();
  }
}

document.addEventListener(
  'DOMContentLoaded',
  function() {
    override();
    $('.champion .plate').html(svg);

    // Only used after tournament closes
    // addFinal();

    let round = appendBracket(bracket);

    let currentRound = round.slice(-1);
    $(`[class*="${currentRound}"]`).addClass('current');

    popup();

    if (!$('[class*="round1"]').hasClass('current')) {
      $('.current .team').each(function() {
        let prevMatchup = $(this)
          .parents()
          .find('[class*="round"]:not(.current) .matchup .team');

        for (let each of Array.from(prevMatchup)) {
          if (each.innerText === this.innerText) $(each).addClass('winner');
        }
      });
    }
    if (window.innerWidth <= 700) {
      $('.champion--congrats').removeClass('label');

      // Disable after tournament closes
      $(window).scroll(function() {
        let scroll = document
          .querySelector('.logo-container')
          .getBoundingClientRect();
        let el = $('.how-to');
        if (scroll.bottom < 160) {
          el.addClass('how-to_visible');
        } else {
          el.removeClass('how-to_visible');
        }
      });
    }
    else {
      // Disbale this too
      $('.how-to > p > span').text('Click');
    }
  },
  {
    once: true,
    capture: false
  }
);
