import { get } from './helpers';
import postscribe from 'postscribe';

class Popup {
  constructor(data) {
    this.data = data
    this.popup = `
    <div class="popup-background">
      <div class="popup">
      <i class="fas fa-times-circle popup__close"></i>
      <div class="popup__loading"></div>
      <div class="popup__poll"></div>
      <div class="popup__content"></div>
      </div>
    </div>`;
  }
  init() {
    let locations = this.data;
    $('.current .matchup').click(e => {
      e.stopPropagation();
      e.preventDefault();
      let matchup = e.currentTarget;
      locations.forEach(i => {
        let team1 = $(matchup)
          .find('li:first-of-type')
          .text();
        let team2 = $(matchup)
          .find('li:last-of-type')
          .text();

        let teams = `${team1} vs. ${team2}`;
        if (i.matchup == teams) {
          if (!$('.popup-background').length) $('body').append(this.popup);
          $('.popup-background').addClass('visible');

          if (i.team1 != undefined) {
            $('.popup__content').html(`
          <p class="team-title"><b>${team1.replace(/(^[0-9]+ )/g, '')}</b></p>
          <p>${i.team1}</p>
          <p class="team-title"><b>${team2.replace(/(^[0-9]+ )/g, '')}</b></p>
          <p>${i.team2}</p>
          `);
          }

          postscribe(
            $('.popup__poll'),
            `<script type="text/javascript" src="https://secure.polldaddy.com/p/${i.id}.js"><\/script>`,
            {
              done: function() {
                $('.popup__loading').hide();
              }
            }
          );

          this.closePopup();
        }
      });
    });
  }
  closePopup() {
    let closeBtn = document.querySelector('.popup__close');
    const close = () => {
      $('.popup-background').removeClass('visible');
      $('.popup__poll').empty();
      $('.popup__loading').show();
    };
    closeBtn.addEventListener('click', close, false);

    $('.visible').click(function(e) {
      e.stopPropagation();
      if (this !== e.target) return;
      close();
    });
  }
}

export const popup = () => {
  get().then(r => new Popup(r).init())
};
