import { get } from './helpers'
import postscribe from 'postscribe'

class Popup {
  constructor(data) {
    this.data = JSON.parse(data);
    this.popup = `
    <div class="popup-background">
      <div class="popup">
      <i class="fas fa-times-circle fa-lg popup__close"></i>
      <div class="popup__content"></div>
      </div>
    </div>`;
  }
  init() {
    let locations = this.data;
    let popup = this.popup;
    $('.matchup').click(e => {
      e.preventDefault();
      e.stopPropagation();
      let matchup = e.currentTarget;
      locations.forEach(i => {
        let teams = `${$(matchup)
          .find('li:first-of-type')
          .text()} vs. ${$(matchup)
          .find('li:last-of-type')
          .text()}`;
        let current = $(matchup)
          .parent()
          .hasClass('current');
        if(i.matchup == teams && current) {
          if (!$('.popup-background').length) $('body').append(popup);
          $('.popup-background').addClass('visible');

          $('.popup__content').empty()

          postscribe($('.popup__content'), `<script type="text/javascript" src="https://secure.polldaddy.com/p/${i.id}.js"><\/script>`);

          this.closePopup();
        }
      })
    })
  }
  closePopup() {
    let closeBtn = document.querySelector('.popup__close')
    const close = () => {
      $('.popup-background').removeClass('visible');
    }
    closeBtn.addEventListener('click', close, false)

    $('.visible').click(function(e) {
       if (this !== e.target) return
       $('.popup-background').removeClass('visible');
    })
  }

}

export const popup = () => {
  get('./pollDaddy.json', function(data) {
    new Popup(data).init()
  });
};
