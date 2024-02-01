# Ragtag

> Streamlined ES6 Tagged Template Literal Templating.

Ragtag streamlines template literals for basic needs, without `false`, `null`, `undefined`, or commas stinking up your content.

## Install

```shell
npm install ragtag
```

## Usage

### Map

```javascript
import html from 'ragtag'
const people = ['Alice', 'Bob', 'Carol']

const output = html`
  <h3>Door list:</h3>
  <ul>
    ${people.map(person => `<li>${person}</li>`)}
  </ul>`
```

```html
<h3>Door list:</h3>
<ul>
  <li>Alice</li>
  <li>Bob</li>
  <li>Carol</li>
</ul>
```

### Ternary

```javascript
import html from 'ragtag'
const people = ['Alice', 'Bob', 'Carol', 'Dave', 'Eddy', 'Frank', 'George']

const output = html`
  <p>
    This party ${people.length < 6 ? 'sucks.' : 'is ok.'}
  </p>`
```

```html
<p>This party is ok.</p>
```

### And operator

#### Falsey

```javascript
import html from 'ragtag'
const isFun = false

const output = html`<div>${isFun && '<p>Has friends</p>'}</div>`
```

```html
<div></div>
```

#### Truthy

```javascript
import html from 'ragtag'
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
]

const output = html`
  <div>
    ${people.length > 10 && '<p>Party time!</p>'}
  </div>`
```

```html
<div>
  <p>Party time!</p>
</div>
```

### Composable template functions

```typescript
import html from 'ragtag'

interface Wine {
  name: string
  varietal: string
  region?: string
  vintage?: number
}

const wines: Wine[] = [
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
]

const wineListItem = ({ name, varietal, region, vintage }: Wine) => html`
<li>
  <h2>${name}</h2>
  <small>
    ${varietal}${region && ` - ${region}`}${vintage && ` - ${vintage}`}
  </small>
</li>`

const wineList = (wines: Wine[]) => html`
<ul>
  ${wines.map(wine => wineListItem(wine))}
</ul>`

const template = (wines: Wine[]) => html`
<div>
  <h1>Wine List</h1>
  ${wines.length > 0 ? wineList(wines) : '<p>Sold Out!</p>'}
</div>`

const output = template(wines)
```

```html
<div>
  <h1>Wine List</h1>
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
</div>
```
