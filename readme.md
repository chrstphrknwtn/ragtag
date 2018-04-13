# Ragtag

Minimal templating using ES6 tagged template literals.

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

## Install
````shell
npm install ragtag
````

## Usage

````javascript
const ragtag = require('ragtag');

const title = '<h1>My great website</h1>';

const links = [
  {
    href: '/',
    text: 'Home'
  },
  {
    href: '/about',
    text: 'About'
  },
  {
    href: '/contact',
    text: 'Contact'
  }
];

const html = ragtag`
  <header>
    ${title}
  </header>
  <nav>
    <ul>
      ${links.map(link => ragtag`
        <li><a href='${link.href}'>${link.text}</a></li>
      `)}
    </ul>
  </nav>
`;

console.log(html);

````

````html
<header>
  <h1>My great website</h1>
</header>
<nav>
  <ul>
    <li><a href='/'>Home</a></li>
    <li><a href='/about'>About</a></li>
    <li><a href='/contact'>Contact</a></li>
  </ul>
</nav>
````
