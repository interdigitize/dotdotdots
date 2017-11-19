'use strict'

module.exports = {
  calculateDotSize: (valLength) => {
    if (valLength <= 15) {
      return '10px';
    }
    if (valLength > 15 && valLength <= 30) {
      return '20px'
    }
    if (valLength > 30 && valLength <= 60) {
      return '40px'
    }
    if (valLength > 60 && valLength <= 120) {
      return '80px'
    }
    if (valLength > 120 && valLength <= 140) {
      return '120px'
    }
  },
  colorSurprise: () => {
    function randomizer(){
      return Math.floor(Math.random() * (255 - 20) + 20);
    }
    return `rgb(${randomizer()}, ${randomizer()}, ${randomizer()})`
  },
  openInNewTab: (url) => {
    var win = window.open(url, '_blank');
    win.focus();
  }
}
