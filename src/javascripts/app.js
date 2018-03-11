import appendBracket from './modules';
import bracket from './modules/bracket.json';
import { popup } from './modules/popup';

// Adds CSS to docuent for compatibility
function addCss(fileName) {
    let head = document.head,
        link = document.createElement('link')

    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = fileName

    head.appendChild(link)
}

// Adds polyfill script to documeant headd
function addJs(scriptName) {
    let head = document.head,
        script = document.createElement('script')

    script.src = scriptName

    head.appendChild(script)
}

function override() {

    // Disables default site styles
    document.querySelector('link[href*="/wps/build/css/"]').disabled = true;

    // removes unnecssary DOM elements
    let toRemove = ['header', '#footer', "#wallpaperWrapper", "#floorboard", ".overlay"];
    for (let selection of toRemove) document.querySelector(selection).remove();
}

// document.addEventListener('DOMContentLoaded', function () {

//     override()
//     addJs("https://cdn.polyfill.io/v2/polyfill.js?features=es6")
//     $('.champion .plate').html(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.3 172.6">
//           <defs>
//             <style>
//               .a {
//                 fill: #fff;
//                 stroke: #F9922F;
//               }
//             </style>
//           </defs>
//           <title>Asset 3</title>
//           <g>
//             <path class="a" d="M165.1,12.6l-32.4,32h0a1.6,1.6,0,0,1-2.4-2.2h0L162,9.5C164.7,7,163.8,5,163.8,5c-2.1-1-4.7,1.8-4.7,1.8l-33.5,31h-.1a1.3,1.3,0,0,1-1.2.3.7.7,0,0,1-.5-.2h-.1a1.3,1.3,0,0,1,0-1.8h.1L157,4.4c4.8-6.9-2.6-2.9-2.6-2.9L137.6,15.1,111.2,37a31.2,31.2,0,0,0-4.4,4.2,8.5,8.5,0,0,0-1.8,3.3c-.5,2,.3,3.6.6,5.5l.7,5.1c.6,4.7-2.2,6.7-2.2,6.7L.3,159.2H.2c-.9.9,1.1,4.6,4.7,8.1S12,173,13,172h.1L111.4,69a10.3,10.3,0,0,1,8.7-1.6l3.1.7a9.1,9.1,0,0,0,8.4-1.4l4.5-4.3c2.6-2.6,5-5.4,7.5-8.2l8.9-10.2,9.6-11,7.8-8.8,3.1-3.6c4.2-8-3.1-2.8-3.1-2.8L138.5,50.7h0a1.6,1.6,0,0,1-2.1-2.3h.1l31.5-32.6c6-9.2-2.7-3.1-2.7-3.1"
//             />
//             <path class="a" d="M12.5.1S8.5-1.2,6,6.6C6,6.6.8,17,22.1,45.8c0,0,13.6,17.1,40.6,41.7,0,0,1.7,1.7,3.5,1,0,0,4-2.5,9.7,1.7v.3a6.3,6.3,0,0,0,1.8,3.7,6.4,6.4,0,0,0,2.7,1.6,4,4,0,0,0,1.6.4l74.1,76h0c.9.9,4.4-1.1,7.9-4.5s5.4-6.9,4.6-7.8h-.1L91.2,87.5a6.1,6.1,0,0,0-1.8-4.8,6.3,6.3,0,0,0-3.8-1.8l-.5-.2s-1.8-2.1-2.7-7.5l-18-17.4C58.5,49.4,54.2,46.3,42,32.9A271.2,271.2,0,0,1,21.3,6.6S16.6.7,12.5.1"
//             />
//           </g>
//         </svg>`);
    
// }, {once: true, capture: false});

window.addEventListener('load', function() {

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

}, {
  once: true,
  capture: false
});