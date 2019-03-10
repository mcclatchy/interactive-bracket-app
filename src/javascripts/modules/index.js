/*
 * Takes one object array param then converts it column arrays
 * Retruns a string with the highest completed round from highest round that's not blank.
 */
export function appendBracket(data) {
  const result = toColumnArray(data);
  let completed = [];
  let i;

  appendMatchups(result);
  for (i in result) {
    if (!result[i].includes('') && !i.includes('b', -1)) completed.push(i);
  }
  
  return completed;
}

function appendMatchups(object) {
  for (const key in object) {
    // Deletes unecessary columns
    delete object.legend;
    if (object.hasOwnProperty(key)) {
      let groupA = document.querySelector(`.group-a .${key}`);
      let groupB = document.querySelector(`.group-b .${key}`);
      let finals = document.querySelector(`.champion .${key}`);

      // Iterates through key values by groups of two
      let i;
      for (i = 0; i < object[key].length; i += 2) {
        if (object[key][i] === 'x') {
          object[key][i] = '';
          object[key][i + 1] = '';
        }

        let matchup = document.createElement('ul');
        matchup.className = 'matchup';
        matchup.innerHTML = `<li class="team">${
          object[key][i]
        }</li><li class="team">${object[key][i + 1]}</li>`;

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
  let output = {};

  data.forEach(item => {
    for (let prop in item) {
      if (item.hasOwnProperty(prop)) {
        // if the key doesn't exist in the output, add it
        if (!(prop in output)) output[prop] = [];
        // add data to the end of the array
        if (item[prop] !== '') output[prop].push(item[prop]);
      }
    }
  });

  return output;
}
