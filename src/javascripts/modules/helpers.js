// Adds CSS to head
function addCSS(urls) {
  Array.isArray(urls) ? urls.forEach(appendLink) : appendLink(urls);

  function appendLink(url) {
    let head = document.head,
      link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link);
  }
}

// Adds polyfill script to head
function addJS(scriptName) {
  let head = document.head,
    script = document.createElement('script');

  script.src = scriptName;

  head.appendChild(script);
}

function addFinal() {
  let congrats = `<div class="champion--congrats label">Congratulations to Bocas House!</div>`;

  $('.champion').append(congrats)

  
  
}

export { addCSS, addJS, addFinal }