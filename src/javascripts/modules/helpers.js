function get(url, success) {
  var xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText);
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send();
  return xhr;
}

function getIDs() {
  return fetch(`https://spreadsheets.google.com/feeds/list/1OJzkgLBC0dUCN66iPQKcf26whIcqoiPqcORCR5wRgUk/2/public/full?alt=json`)
    .then(r => r.json())
    .then(json => {
      let rows = json.feed.entry;
      let cleanRows = [];
      rows.forEach(i => {
        cleanRows.push({
          matchup: i.gsx$matchup.$t,
          id: i.gsx$id.$t,
          team1: i.gsx$team1.$t,
          team2: i.gsx$team2.$t
        });
      });
      return cleanRows;
    });

}

export { getIDs }