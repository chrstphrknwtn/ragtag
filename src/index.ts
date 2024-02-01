export default (literals: TemplateStringsArray, ...expressions: Array<any>) => {
  return literals.reduce((accumulator, literal, index) => {
    let expression = expressions[index - 1]
    if (Array.isArray(expression)) {
      expression = expression.join('')
    }

    return accumulator + (expression ? expression : '') + literal
  })
}
