const sheetKey = '1OJzkgLBC0dUCN66iPQKcf26whIcqoiPqcORCR5wRgUk';

async function tournament() {
  let sheet, round;
  try {
    sheet = await fetchSheet()
  } catch (e) {
    console.log(e);
  } finally {
    // Returns active, current round
    round = getBracket(sheet)
  }
  return round;
}

function fetchSheet() {
  return new Promise(resolve => {
    Tabletop.init({
      key: sheetKey,
      callback: resolve,
      prettyColumnNames: false,
      simpleSheet: true
    });
  });
}

function getBracket(data) {
  const result = toColumnArray(data);
  appendMatchups(result);

  let completed = [];

  let i;
  for (i in result) {
    if (!result[i].includes("") && !i.includes('b', -1)) completed.push(i); 
  }

  return completed;
}

function appendMatchups(object) {
    for (const key in object) {
        // Deletes unecessary columns
        delete object.legend;
        delete object.rowNumber;
        if (object.hasOwnProperty(key)) {
          let groupA = document.querySelector(`.group-a .${key}`),
           groupB = document.querySelector(`.group-b .${key}`),
           finals = document.querySelector(`.champion .${key}`);

          // Iterates through key values by groups of two
          let i;
          for (i = 0; i < object[key].length; i += 2) {
              if (object[key][i] === 'x') {
                  object[key][i] = "";
                  object[key][i+1] = "";
              }

              let matchup = document.createElement('ul');
              matchup.className = 'matchup';
              matchup.innerHTML = `<li class="team">${object[key][i]}</li><li class="team">${object[key][i + 1]}</li>`;

              // Sorts matchups into respective group
              switch (true) {
                case key.includes('round1') && i < 16:
                case key.includes('round2') && i < 8:
                case key.includes('round3') && i < 4:
                case key.includes('round4') && i < 2:
                  groupA.appendChild(matchup);
                  break;
                case key.includes('round1') && i >= 16:
                case key.includes('round2') && i >= 8:
                case key.includes('round3') && i >= 4:
                case key.includes('round4') && i >= 2:
                  groupB.appendChild(matchup);
                  break;
                default:
                  finals.appendChild(matchup);
              }

          }
        }
    }
}

function toColumnArray(data) {
  const output = {};
  let item;
  // iterate through each row
  for (let i in data) {
    item = data[i];
    for (let prop in item) {
      if (item.hasOwnProperty(prop)) {
        // if the key doesn't exist in the output, add it
        if (!(prop in output)) output[prop] = [];
        // add data to the end of the array
        if (item[prop] !== '') output[prop].push(item[prop]);
      }
    }
  }
  return output;
}

export default tournament;
