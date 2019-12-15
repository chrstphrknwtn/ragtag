# Ragtag

Minimal templating using ES6 tagged template literals.

Useful for basic templating when you don't need a full-blown templating system, but still need a bit more than template literals provide.

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

## Install
````shell
npm install ragtag
````

## Loops

````javascript
const ragtag = require('ragtag');
const people = ['Alice', 'Bob', 'Carol'];

const output = ragtag`
<div>
  <p>People invited to my party:</p>
  <ul>
    ${people.map(person => '<li>${person}</li>')}
  </ul>
</div>
`;
````

````html
<div>
  <p>People invited to my party:</p>
  <ul>
    <li>Alice</li>
    <li>Bob</li>
    <li>Carol</li>
  </ul>
</div>
````

## Ternary

````javascript
const ragtag = require('ragtag');
const people = ['Alice', 'Bob', 'Carol'];

const output = ragtag`
<div>
  ${people.length < 6 ? (
    '<p>It\'s still a little lonely.</p>'
  ) : (
    '<small>My party is full.</small>'
  )}
</div>
`;
````

````html
<div>
  <p>It's still a little lonely.</p>
</div>
````

## And operator
Using regular template literals this will return `false` in your template, instead of nothing.

````javascript
const people = ['Alice', 'Bob', 'Carol'];

const output = ragtag`
<div>
  ${people.length > 0 && '<div>I\'m having a party!</div>'}
</div>
`;
````

````html
<div>
  <div>I'm having a party!</div>
</div>
````

## Objects

````javascript
const wines = [
  {
    name: 'Stadt Krems',
    varietal: 'Grüner Veltliner',
    region: 'Kremstal',
    vintage: 2018
  },
  {
    name: 'Terrassen Federspiel',
    varietal: 'Grüner Veltliner',
    region: 'Wachau',
    vintage: 2016
  }
];

const output = ragtag`
<div>
  <h1>It will be a fun party:</h1>
  <ul>
  ${wines.map(wine => ragtag`
    <li>
      <h2>${wine.name}</h2>
      <small>${wine.varietal} - ${wine.region} - ${wine.vintage}</small>
    </li>
    `)}
  </ul>
</div>
`;
````

````html
<div>
  <h1>It will be a fun party:</h1>
  <ul>
    <li>
      <h2>Stadt Krems</h2>
      <small>Grüner Veltliner - Kremstal - 2018</small>
    </li>
    <li>
      <h2>Terrassen Federspiel</h2>
      <small>Grüner Veltliner - Wachau - 2016</small>
    </li>
  </ul>
</div>
````

## Function components

````javascript
const wineListItem = ({name, varietal, region, vintage}) => ragtag`
<li>
  <h2>${name}</h2>
  <small>${varietal} - ${region} - ${vintage}</small>
</li>
`;

const wineList = wines => ragtag`
  ${wines && wines.length > 0 && (ragtag`
    <ul>
      ${wines.map(wine => wineListItem(wine))}
    </ul>
  `)}
`;

const output = wineList(wines);
````

````html
<ul>
  <li>
    <h2>Stadt Krems</h2>
    <small>Grüner Veltliner - Kremstal - 2018</small>
  </li>
  <li>
    <h2>Terrassen Federspiel</h2>
    <small>Grüner Veltliner - Wachau - 2016</small>
  </li>
</ul>
````
