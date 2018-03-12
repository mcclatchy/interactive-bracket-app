import appendBracket from './modules';
import bracket from './modules/bracket.json';
import { popup } from './modules/popup';
import { svg } from './modules/svg'

// Adds CSS to docuent for compatibility
function addCss(fileName) {
  let head = document.head,
    link = document.createElement('link');

  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = fileName;

  head.appendChild(link);
}

// Adds polyfill script to documeant headd
function addJs(scriptName) {
  let head = document.head,
    script = document.createElement('script');

  script.src = scriptName;

  head.appendChild(script);
}

function override() {
  // Disables default site styles
  document.querySelector('link[href*="/wps/build/css/"]').disabled = true;
  // removes unnecssary DOM elements
  let toRemove = ['header', '#footer', "#wallpaperWrapper", "#floorboard", ".overlay"];
  toRemove.map(el => document.querySelector(el).remove());
}

document.addEventListener('DOMContentLoaded', function () {

    // override()
    // addJs("https://cdn.polyfill.io/v2/polyfill.js?features=es6")
    $('.champion .plate').html(svg);

    addCss('https://use.fontawesome.com/releases/v5.0.7/css/all.css');
    addCss('https://media.miamiherald.com/static/media/projects/fonts/fonts.css');
    // addCss('https://media.miamiherald.com/static/media/projects/2018/munch-madness/stylesheets/app.css');

    // getSheet().then(sheet => {
    let round = appendBracket(bracket);

    let currentRound = round.slice(-1);
    $(`[class*="${currentRound}"]`).addClass('current');

    popup(); // This may need to moved down if not using Fetch

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
        let el = $('.how-to');
        if (scroll.bottom < 80) {
          el.addClass('how-to_visible');
        } else {
          el.removeClass('how-to_visible');
        }
      });
    } else {
      $('.how-to > p > span').text('Click');
    }
    // });
  },
  {
    once: true,
    capture: false
  }
);
