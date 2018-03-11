function get() {
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

export { get }