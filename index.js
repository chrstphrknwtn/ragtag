module.exports = (literals, ...expressions) => {
	let compiledTemplate = '';

	expressions.forEach((expression, i) => {
		if (Array.isArray(expression)) {
			expression = expression.join('');
		}

		compiledTemplate += expression ? literals[i] : literals[i].trim();
		if (expression) {
			compiledTemplate += expression;
		}
	});

	compiledTemplate += literals[literals.length - 1].trim();

	return compiledTemplate.trim();
};
