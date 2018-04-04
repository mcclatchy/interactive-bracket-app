import postscribe from 'postscribe';
import polls from './pollDaddy.json';

class Popup {
  constructor(data) {
    this.data = data;
    this.popup = `
    <div class="popup-background">
      <div class="popup">
      <i class="fas fa-times-circle popup__close"></i>
      <div class="popup__loading"></div>
      <div class="popup__poll"></div>
      <div class="popup__content"></div>
      <p class="popup__close">Close</p>
      </div>
    </div>`;
  }
  init() {
    let matchups = this.data;
    $('body').append(this.popup);

    this.closePopup();
    $('p.popup__close').hide();

    $('.current .matchup').click(e => {
      e.preventDefault();
      let matchup = e.currentTarget;

      let team1 = $(matchup)
        .find('li:first-of-type')
        .text();
      let team2 = $(matchup)
        .find('li:last-of-type')
        .text();
      let teams = `${team1} vs. ${team2}`;

      matchups.forEach(i => {
        if (i.matchup == teams) {
          $('.popup-background').addClass('visible');
          $('.popup')
            .removeClass('slide-out-top')
            .addClass('slide-in-top');

          if (i.team1 != undefined) {
            $('.popup__content')
              .html(
                `
          <p class="team-title"><b>${team1.replace(/(^[0-9]+\s)/g, '')}</b></p>
          <p>${i.team1}</p>
          <p class="team-title"><b>${team2.replace(/(^[0-9]+\s)/g, '')}</b></p>
          <p>${i.team2}</p>`
              ).show();
          }

          postscribe(
            $('.popup__poll'),
            `<script type="text/javascript" src="https://secure.polldaddy.com/p/${i.id}.js"><\/script>`,
            {
              done: () => {
                $('.popup__loading').hide();
                this.voteClick();
              },
              error: () => {
                $('.popup__poll').html(`<div class="poll-error"><p><i class="fas fa-exclamation-triangle"></i></p><p>Unable to load poll<br/><b><a target="_blank" href="https://polldaddy.com/poll/${i.id}/">Click here to vote</a></b></p></div>`).addClass('poll-error');
                $('.popup__close').show();
              }
            }
          );
        }
      });
    });
  }
  closePopup() {
    const close = event => {
      event.stopPropagation();
      $('.popup').addClass('slide-out-top');
      $('.popup').removeClass('slide-in-top');
      setTimeout(() => {
        $('.popup__poll').empty()
        $('.popup__loading').show();
        $('.popup-background').removeClass('visible');
      }, 250);
    };

    $('.popup__close').click(close);

    $('.popup-background').click(function(e) {
      if (this !== e.target) return;
      close(e);
    });
  }
  voteClick() {
    $('.pds-vote-button, .pds-view-results').click(() => {
        $('.popup__content').hide()
        $('p.popup__close').show()
      }
    );
  }
}

export const popup = () => {
  new Popup(polls).init();
};
