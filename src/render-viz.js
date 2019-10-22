import * as d3 from 'd3';
import { validator } from './validator';
import { dancerSchema, goodData, badData } from './schema';

const goodDataButton = document.getElementById('good-data');
const badDataButton = document.getElementById('bad-data');

function removeOldViolations() {
  d3.select('.feedback')
    .selectAll('p')
    .remove();
};

function renderD3(dataset) {
  removeOldViolations();
  d3.select('.feedback')
    .selectAll('p')
    .data(dataset)
    .enter()
    .append('p')
    .text(function (d) { return d });
  document.getElementById('results').lastElementChild.scrollIntoView();
};


function renderViolations(schema, data) {
  validator(schema, data).then((violations) => {
    renderD3(violations)
  }).catch((noViolations) => renderD3(noViolations))
};

goodDataButton.addEventListener('click', function () {
  renderViolations(dancerSchema, goodData)
});

badDataButton.addEventListener('click', function () {
  renderViolations(dancerSchema, badData)
});
