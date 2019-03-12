import { appendBracket } from './modules/parse-bracket';
import { PollModal } from './modules/popup';

document.addEventListener(
  'DOMContentLoaded',
  function() {
    // usesed Date.now() to bust FTP server cache
    let now = Date.now();

    overrideDefault();
    fetch(
      `https://gist.githubusercontent.com/aaronalbright/14db19f42f2575f5e92f1920b5c76958/raw/ff43f0972e5547586ee3c9c22ce85bc531d277f7/bracket-data.json?x=${now}`
    )
      .then(res => res.json())
      .then(data => {
        const bracket = data['bracket_data'];
        const pollData = data['poll_ids'];

        let round = appendBracket(bracket);
        let final = false;

        let currentRound = round.slice(-1);

        $(`[class*="${currentRound}"]`).addClass('current');

        currentRound == 'final' ? (final = true) : (final = false);

        if (currentRound.includes('semi') || currentRound == 'final') {
          $('.mm-container.champion').addClass('final-four');
        }

        let polls = new PollModal(pollData);
        polls.init();

        if (final) {
          addFinal('Bocas House');
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
          if (!final) {
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
        } else {
          if (!final) {
            $('.how-to > p > span').text('Click');
          }
        }
      });
  },
  {
    once: true,
    capture: false
  }
);

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

function addFinal(winner) {
  let congrats = `<div class="champion--congrats label">Congratulations to ${winner}!</div>`;
  $('.champion').append(congrats);
}
