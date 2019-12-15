import test from 'ava';
import ragtag from '.';

test('Default Template Literal', t => {
	const str = 'string';
	const tmp = ragtag`<h1>${str}</h1>`;

	t.is(tmp, '<h1>string</h1>');
});

test('Nested Array Map', t => {
	const arr = [1, 2, 3, 4];
	const tmp = ragtag`${arr.map(a => ragtag`<div>${a}</div>`)}`;

	t.is(tmp, '<div>1</div><div>2</div><div>3</div><div>4</div>');
});

test('Nested Object Map', t => {
	const obj = {a: 1, b: 2, c: 3, d: 4};
	const tmp = ragtag`${Object.keys(obj).map(key => ragtag`<div>${obj[key]}</div>`)}`;

	t.is(tmp, '<div>1</div><div>2</div><div>3</div><div>4</div>');
});

test('Ternary expression returns for truthy value', t => {
	const value = true;
	const tmp = ragtag`${value ? '<div>True</div>' : '<div>False</div>'}`;

	t.is(tmp, '<div>True</div>');
});

test('Ternary expression returns for falsey value', t => {
	const value = false;
	const tmp = ragtag`${value ? '<div>True</div>' : '<div>False</div>'}`;

	t.is(tmp, '<div>False</div>');
});

test('Falsey first expression returns empty string', t => {
	const arr = [];
	const tmp = ragtag`${arr.length > 0 && '<div />'}`;

	t.is(tmp, '');
});

test('Nested Falsey expressions return complete template', t => {
	const tmp = ragtag`<div>${false && '<div/>'}<div />${false && '<div/>'}</div>`;

	t.is(tmp, '<div><div /></div>');
});

test('Whitespace in literals is preserved', t => {
	const tmp = ragtag`I am a sentence with spaces.`;

	t.is(tmp, 'I am a sentence with spaces.');
});

test('Do not trim whitepace between expressions', t => {
	const a = 'Hello';
	const b = 'world';
	const tmp = ragtag`<div>${a}, ${b}.</div>`;

	t.is(tmp, '<div>Hello, world.</div>');
});
