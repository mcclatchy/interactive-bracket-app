import appendBracket from './modules';
// import bracket from './modules/bracket.json';
import PollModal from './modules/popup';
import { svg } from './modules/svg';
import { addFinal } from './modules/helpers';

function overrideDefault() {
  // Disables default site styles
  document.querySelector('link[href*="/wps/build/css/"]').disabled = true;
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
    overrideDefault();
    $('.champion .plate').html(svg);

    fetch(
      'https://gist.githubusercontent.com/aaronalbright/f343f4f6306a9f4d0788797ddf208c0e/raw/d9cb1b0686c1b19f1da9d5e8e46e37fa8252362f/bracket.json'
    )
    .then(res => res.json())
    .then(bracket => {
      let round = appendBracket(bracket);
      let final = false;

      let currentRound = round.slice(-1);

      $(`[class*="${currentRound}"]`).addClass('current');

      currentRound == "final" ? (final = true) : (final = false);

      if (final) {
        addFinal("Bocas House");
      }

      if (!$('[class*="round1"]').hasClass('current')) {
        // Addes green color to previus match ups
        $('.current .team').each(function () {
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

        if (!final) {
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
        if (!final) {
          $('.how-to > p > span').text('Click');
        }
      }
    });

    fetch('jsonfile.json')
    .then(r => r.json())
    .then(pollData => {
      let ppoups = new PollModal(pollData);
    });
  },
  {
    once: true,
    capture: false
  }
);
