import tournament from './modules'

tournament()
.then(r => {
  let currentRound = r.slice(-1);

  $(`[class*="${currentRound}"]`).addClass('current');

  if (!$('[class*="round1"]').hasClass('current')) {
    $('.current .team').each(function() {
      let prevMatchup = $(this)
        .parents()
        .find('[class*="round"]:not(.current) .matchup .team');

      for (let each of prevMatchup) {
        if (each.innerText === this.innerText) {
          $(each)
            .addClass('winner')
            // .append(' <i title="Winner" class="fas fa-check-circle"></i>');

        }
      }
    });
  }
});
// if (module.hot) {
// module.hot.accept('./modules', function() {
//   console.log('Updating bracket!');
//   $('.matchup').remove();
//   renderBracket();
// });
// }
