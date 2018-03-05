// Use Fetch API to get Google Sheet as JSON then parses and returns the rows with clean keys
export default function() {
  return fetch(`https://spreadsheets.google.com/feeds/list/1OJzkgLBC0dUCN66iPQKcf26whIcqoiPqcORCR5wRgUk/1/public/full?alt=json`)
    .then(r => r.json())
    .then(json => {
      let rows = json.feed.entry;
      let cleanRows = [];
      rows.forEach(i => {
        cleanRows.push({
          round1: i.gsx$round1.$t,
          round1b: i.gsx$round1b.$t,
          round2: i.gsx$round2.$t,
          round2b: i.gsx$round2b.$t,
          round3: i.gsx$round3.$t,
          round3b: i.gsx$round3b.$t,
          round4: i.gsx$round4.$t,
          round4b: i.gsx$round4b.$t,
          semi: i.gsx$semi.$t,
          semib: i.gsx$semib.$t,
          semib: i.gsx$semib.$t,
          final: i.gsx$final.$t
        });
      });
      return cleanRows;
    });
}
