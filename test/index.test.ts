import ragtag from '../src'

test('should handle simple string substitution', () => {
  const name = 'Ada'
  const output = ragtag`Hello, ${name}!`
  expect(output).toBe('Hello, Ada!')
})

test('should handle multiple substitutions', () => {
  const firstName = 'Ada'
  const lastName = 'Lovelace'
  const output = ragtag`${firstName} ${lastName}`
  expect(output).toBe('Ada Lovelace')
})

test('should render empty string for falsy values', () => {
  const value = false
  const output = ragtag`Value is ${value}`
  expect(output).toBe('Value is ')
})

test('should render empty string for null', () => {
  const value = null
  const output = ragtag`Value is ${value}`
  expect(output).toBe('Value is ')
})

test('should render empty string for undefined', () => {
  let value: any
  const output = ragtag`Value is ${value}`
  expect(output).toBe('Value is ')
})

test('should correctly handle empty strings', () => {
  const emptyString = ''
  const output = ragtag`This is an ${emptyString}`
  expect(output).toBe('This is an ')
})

test('should handle special characters correctly', () => {
  const specialCharString = `Line1\nLine2\tTabbed`
  const output = ragtag`${specialCharString}`
  expect(output).toBe(`Line1\nLine2\tTabbed`)
})

test('should handle HTML entities correctly', () => {
  const htmlString = 'Be <b>bold</b>, start&nbsp;cold'
  const output = ragtag`${htmlString}`
  expect(output).toBe('Be <b>bold</b>, start&nbsp;cold')
})

test('should handle complex nested expressions', () => {
  const flag = true
  const value = 43
  const output = ragtag`Value is ${flag ? `Number(${value})` : 'None'}`
  expect(output).toBe('Value is Number(43)')
})

test('should render function return values correctly', () => {
  const fn = () => 'Function Output'
  const output = ragtag`This is a ${fn()}`
  expect(output).toBe('This is a Function Output')
})

test('should concatenate array items without commas', () => {
  expect(ragtag`${[1, 2, 3, 4].map(a => `${a}`)}`).toBe('1234')
})

test('should map object values into template', () => {
  const obj = { a: 1, b: 2, c: 3, d: 4 }
  const output = ragtag`${Object.entries(obj).map(
    ([_, value]) => `${value}, `
  )}`
  expect(output).toBe('1, 2, 3, 4, ')
})

test('should render correct value based on ternary expression', () => {
  expect(ragtag`${true ? 'yes' : 'no'} of course`).toBe('yes of course')
  expect(ragtag`${false ? 'yes' : 'no'} way`).toBe('no way')
})

test('should render empty string for falsey conditions in And operator', () => {
  expect(ragtag`${false && 'x'}`).toBe('')
  expect(ragtag`${null && 'x'}`).toBe('')
  expect(ragtag`${undefined && 'x'}`).toBe('')
})

test('should not render falsey expressions in nested structures', () => {
  const output = ragtag`${false && 'x'}, ${false && 'x'}`
  expect(output).toBe(', ')
})

test('should preserve whitespace in templates', () => {
  expect(ragtag`   A sentence  with  many irregular spaces. `).toBe(
    '   A sentence  with  many irregular spaces. '
  )
})

test('should render composable template functions example correctly', () => {
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

  const wineListItem = ({
    name,
    varietal,
    region,
    vintage
  }: Wine) => ragtag`<li>
      <h2>${name}</h2>
      <small>
        ${varietal}${region && ` - ${region}`}${vintage && ` - ${vintage}`}
      </small>
    </li>`

  const wineList = (wines: Wine[]) => ragtag`<ul>
    ${wines.map(wine => wineListItem(wine))}
  </ul>`

  const template = (wines: Wine[]) => ragtag`<div>
    <h1>Wine List</h1>
    ${wines.length > 0 ? wineList(wines) : '<p>Sold Out!</p>'}
  </div>`

  const output = template(wines).trim()

  expect(output).toBe(`<div>
    <h1>Wine List</h1>
    <ul>
    <li>
      <h2>Stadt Krems</h2>
      <small>
        Grüner Veltliner - Kremstal
      </small>
    </li><li>
      <h2>Terrassen Federspiel</h2>
      <small>
        Grüner Veltliner - 2016
      </small>
    </li>
  </ul>
  </div>`)
})
