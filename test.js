import test from 'ava';
import ragtag from '.';

test('Default Template Literal', t => {
	const str = 'string';
	const tmp = ragtag`<h1>${str}</h1>`;

	t.is(tmp, '<h1>string</h1>');
});

test('Nested Array Map', t => {
	const arr = [1, 2, 3, 4];
	const tmp = ragtag`
		${arr.map(a => ragtag`
			<div>${a}</div>
		`)}
	`;

	t.is(tmp, '<div>1</div><div>2</div><div>3</div><div>4</div>');
});
