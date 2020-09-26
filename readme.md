# Ragtag

Minimal templating using ES6 tagged template literals.

For simple things that don't need a complete template system, but still a bit more than template literals provide.

## Install

```shell
npm install ragtag
```

## Usage

Ragtag basically makes tagged template literals work as you would expect them to work, ie. not stinking up your content with `false`, `null`, `undefined` or `,` all over the place.

### Map

```javascript
const html = require('ragtag');
const people = ['Alice', 'Bob', 'Carol'];

const output = html`
  <div>
    <p>People invited to my party:</p>
    <ul>
      ${people.map(person => `<li>${person}</li>`)}
    </ul>
  </div>
`;
```

```html
<div>
  <p>People invited to my party:</p>
  <ul>
    <li>Alice</li>
    <li>Bob</li>
    <li>Carol</li>
  </ul>
</div>
```

### Ternary

```javascript
const html = require('ragtag');
const people = ['Alice', 'Bob', 'Carol'];

const output = html`
  <div>
    ${people.length < 6
      ? '<p>This party sucks.</p>'
      : '<small>This party is just ok.</small>'}
  </div>
`;
```

```html
<div>
  <p>This party sucks.</p>
</div>
```

### And

#### Falsey

```javascript
const html = require('ragtag');
const isCool = false;

const output = html`
  <div>
    ${isCool && '<div>Has friends</div>'}
  </div>
`;
```

```html
<div></div>
```

#### Truthy

```javascript
const html = require('ragtag');
const people = [
  'Alice',
  'Bob',
  'Carol',
  'Dave',
  'Eddy',
  'Frank',
  'George',
  'Henry',
  'Isaac',
  'John',
  'Kimberly',
  'Lucy'
];

const output = html`
  <div>
    ${people.length > 10 && '<div>Party time!</div>'}
  </div>
`;
```

```html
<div>
  <div>Party time!</div>
</div>
```

### Function components

```javascript
const html = require('ragtag');

const wines = [
  {
    name: 'Stadt Krems',
    varietal: 'Grüner Veltliner',
    region: 'Kremstal'
  },
  {
    name: 'Terrassen Federspiel',
    varietal: 'Grüner Veltliner',
    vintage: 2016
  }
];

const wineListItem = ({ name, varietal, region, vintage }) => html`
  <li>
    <h2>${name}</h2>
    <small>
      ${varietal}${region && ` - ${region}`}${vintage && ` - ${region}`}
    </small>
  </li>
`;

const wineList = wines => html`
  ${wines &&
    wines.length > 0 &&
    html`
      <ul>
        ${wines.map(wine => wineListItem(wine))}
      </ul>
    `}
`;

const output = wineList(wines);
```

```html
<ul>
  <li>
    <h2>Stadt Krems</h2>
    <small>Grüner Veltliner - Kremstal</small>
  </li>
  <li>
    <h2>Terrassen Federspiel</h2>
    <small>Grüner Veltliner - 2016</small>
  </li>
</ul>
```
