# Miami Herald Interactive Bracket
## About
This bracket was designed to display an interactive bracket using Google Sheets as a back end and Polldaddy as a front-end voting mechanism.

Bracket organizners fill out the formatted Google Sheet with competeing teams (it currently supports up to 64). The other sheet must be filled with PollDaddy IDs and whatever poll title format you decide on. (More on this in Getting Started)

This bracket was designed to reduce friction between creating the bracket and updating it, including the voting mechanism.

This bracekt has two possible approaches.
1. A "live" updating bracket that automatically display changes to the Google Sheet
2. A static bracket that is only updated once a new version of the `app.js` file is created.

The latter approach is prefered to reduce the depenecey on Google Sheet's API and avoid possible rate limits.

## Getting started

Things you'll need:
* [Yarn](https://yarnpkg.com/en/)
* Node 8.8.1 or higher (have not tested with older versions)

Clone the repo and `yarn install`

### Google Sheet setup

Save a copy of [this Google Sheet](https://docs.google.com/spreadsheets/d/1zq7VnvSTw70U7wjvyYaGP20dw22dlvsYcVTA4WEGZE8/edit?usp=sharing).

The spreadsheet consists of two sections:
1. Bracket
2. Poll IDs

The **Bracket** sheet is pretty much WYSIWYG. Empty matchups *must* be filled with `x` in order to still appear on the page.

The **Poll IDs** sheet is used to organize and reference each poll (i.e. matchup) created in Polldaddy.
#### Dictionary

| Name | Required | Description |
| --- | --- | --- |
| round | No | Only used to keep track of matchups through each round. Can be emitted if desired. Prior rounds can also be moved to another sheet
| matuchup | Yes | The "Poll Question" of the matchup created in Polldaddy. MUST match exactly (e.g. "Team X vs. Team Y") 
| id | Yes | The poll ID copied from Polldaddy. You'll get these in the Polldaddy setup
| team1 | No | An optional description of the team that will display under the poll
| team2 | No | An optional description of the team that will display under the poll

You'll need to use the "Export JSON" script at the top of the page (next to "Help"). Once you authorize the script, you'll be able to copy/paste the resutling JSON into a file. Do this for each sheet.

### Polldaddy setup

*This is not a tutorial for Polldaddy and assumes you're already somewhat familiar with it*

As you create each poll, copy the Poll Question (the title) into the `matchup` column in the Poll IDs sheet.

In the "Collect Votes" section, after you have designed and created the poll, there will be Javascript embed:

```
<script type="text/javascript" charset="utf-8" src="https://secure.polldaddy.com/p/[COPY_ID_HERE].js"></script>
<noscript><a href="https://polldaddy.com/poll/[ID_IS_THE_SAME_HERE]/">Test poll</a></noscript>
```

Copy the ID from either link (it can also be found in the URL in your browser *after* the poll is created) and place paste it into the `id` in the sheet.

Put the exported JSON from `bracket` into `~/src/javascripts/modules/bracket.json` and the export JSON from `Poll IDs` into `~/src/javascripts/modules/pollDaddy.json`.

Your bracket is now ready to be built!

### Node setup

Use `yarn start` and your test server will be up at `http://localhost:3000` if a new tab isn't opened automatically.

When testing your app, ensure the `override()` function is commented out/disabled.

Use `yarn build` to package everything into `app.js`.

## Known Issues

Polldaddy has shown to be pretty hackable and/or cheated. There's nothing stopping a bot to from automatically voiting. Even with IP restrctions, proxies can usually get around it. I'm not even confident using reCaptcha works sufficently to justify its use at the expense of user-friendliness.

## To Do

* Make switching from dev to production envrioments/builds easier.
* Wrap functions so switching styles between rounds is easier.
