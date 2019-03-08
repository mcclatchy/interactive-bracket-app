import appendBracket from './modules';
import bracket from './modules/bracket.json';
import { initPopup } from './modules/popup';
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

    let round = appendBracket(bracket);
    let final = false;

    let currentRound = round.slice(-1);
    
    $(`[class*="${currentRound}"]`).addClass('current');

    initPopup();

    currentRound == "final" ? (final = true) : (final = false);

    if(final) {
      addFinal("Bocas House");
    }

    if (!$('[class*="round1"]').hasClass('current')) {
      // Addes green color to previus match ups
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

      if(!final) {
        $(window).scroll(function () {
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
    }
    else {
      if(!final) {
        $('.how-to > p > span').text('Click');
      }
    }
  },
  {
    once: true,
    capture: false
  }
);
