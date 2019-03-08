function addFinal(winner) {
  let congrats = `<div class="champion--congrats label">Congratulations to ${winner}!</div>`;
  $('.champion').append(congrats)
}

export { addFinal }