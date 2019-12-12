module.exports = (literals, ...expressions) => {
	let compiledTemplate = '';

	expressions.forEach((expression, i) => {
		if (Array.isArray(expression)) {
			expression = expression.join('');
		}

		compiledTemplate += literals[i].trim();
		if (expression) {
			compiledTemplate += expression;
		}
	});

	compiledTemplate += literals[literals.length - 1].trim();

	return compiledTemplate.trim();
};
