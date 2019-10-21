# Data Validation Playground

## Problem Space
A data producer can send bad data (data object that has missing or incorrectly typed properties) to the data consumer without notice.

## Solution
This validation mechanism will alert you of violations to the expected data model. It takes in a data object and a schema to determine if it passes. Violations of the schema are rendered to the DOM.

## Setup Locally
### From the command line, run the following:
- `git clone https://github.com/JasminTrotter/sprinklr-data-viz.git`
- `cd sprinklr-data-viz`
- `npm i`
- `npm run build`
- Running `open main.html` should open the application in your browser

## Tech
- npm
- webpack
- d3 (data visualization library)

## Testing
Testing is done with Jest.
- `npm run test`

## Contributing
Pull Requests are welcome! Please make your code changes on a separate branch and run `npm run test` before your commit.
