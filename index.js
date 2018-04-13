module.exports = (literals, ...expressions) => {
	let compiledTemplate = '';

	expressions.forEach((expression, i) => {
		if (Array.isArray(expression)) {
			expression = expression.join('');
		}

		compiledTemplate += literals[i];
		compiledTemplate += expression;
	});

	compiledTemplate += literals[literals.length - 1];

	return compiledTemplate.trim();
};
