import ragtag from '../src';

test('Default Template Literal', () => {
  const title = 'Banana';
  expect(ragtag`<h1>${title}</h1>`).toEqual('<h1>Banana</h1>');
});

test('Array Map', () => {
  expect(ragtag`${[1, 2, 3, 4].map(a => `<div>${a}</div>`)}`).toEqual(
    '<div>1</div><div>2</div><div>3</div><div>4</div>'
  );
});

test('Object Map', () => {
  const obj = { a: 1, b: 2, c: 3, d: 4 };
  const result: string = ragtag`${Object.keys(obj).map(key => {
    const value: number = obj[key as keyof typeof obj];
    return ragtag`<div>${value}</div>`;
  })}`;

  expect(result).toEqual('<div>1</div><div>2</div><div>3</div><div>4</div>');
});

test('Ternary expression', () => {
  expect(ragtag`${true ? 'yes' : 'no'}`).toEqual('yes');
  expect(ragtag`${false ? 'yes' : 'no'}`).toEqual('no');
});

test('Conditional And operator', () => {
  expect(ragtag`${false && '<div />'}`).toEqual('');
  expect(ragtag`${null && '<div />'}`).toEqual('');
  expect(ragtag`${undefined && '<div />'}`).toEqual('');
});

test('Nested Falsey expression', () => {
  const result = ragtag`<div>${false && 'Boo!'}<div />${false &&
    'Hiss!'}</div>`;
  expect(result).toEqual('<div><div /></div>');
});

test('Whitespace is preserved', () => {
  expect(ragtag`   A sentence  with  fun spaces. `).toEqual(
    '   A sentence  with  fun spaces. '
  );

  expect(ragtag`<div>${'Hello'}, ${'world'}.</div>`).toEqual(
    '<div>Hello, world.</div>'
  );
});
