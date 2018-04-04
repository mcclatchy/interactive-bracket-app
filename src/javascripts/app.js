import appendBracket from './modules';
import bracket from './modules/bracket.json';
import { popup } from './modules/popup';
import { svg } from './modules/svg';
import { addCSS, addJS, addFinal} from './modules/helpers';

function override() {
  // Disables default site styles
  document.querySelector('link[href*="/wps/build/css/theme.markets/"]').disabled = true;
  // removes unnecssary DOM elements
  let toRemove = [
    'header',
    '#footer',
    '#wallpaperWrapper',
    '#floorboard',
    '.overlay'
  ];
  toRemove.forEach(function(el) {
    document.querySelector(el).remove()
  });
}

document.addEventListener(
  'DOMContentLoaded',
  function() {

    // override();
    addJS('https://cdn.polyfill.io/v2/polyfill.js?features=es6');
    $('.champion .plate').html(svg);

    addFinal();


    addCSS([
      'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
      // 'http://pubsys.miamiherald.com/static/media/projects/2018/munch-madness/stylesheets/app.css'
    ]);
    
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

      $('.champion--congrats').removeClass('label')

      // ONLY NEEDED DURING ACTIVE MADNESS
      // setTimeout(() => {
      //   $('.how-to').addClass('how-to_visible');
      // }, 3000);

      // $(window).scroll(function() {
      //   let scroll = document
      //     .querySelector('.logo-container')
      //     .getBoundingClientRect();
      //   let el = $('.how-to');
      //   if (scroll.bottom < 160) {
      //     el.addClass('how-to_visible');
      //   } else {
      //     el.removeClass('how-to_visible');
      //   }
      // });
    } else {
      // $('.how-to > p > span').text('Click');
    }
  },
  {
    once: true,
    capture: false
  }
);
