/**
 * @jest-environment jsdom
*/
import { oneWay, roundTrip } from '../components/dateInput/dateInput'

beforeAll(() => {
  document.querySelector('body').innerHTML = '<div class=\'calendar-widget\'></div>'
})

test('oneWay test', () => {
  const form = oneWay()
  document.querySelector('.calendar-widget').insertAdjacentElement('beforeend', form)
  const input = document.querySelector('.date__input')

  expect(input.children.length).toBe(1)
})
test('roundTrip test', () => {
  const form = roundTrip()
  document.querySelector('.calendar-widget').insertAdjacentElement('beforeend', form)
  const input = document.querySelector('.date-round')

  expect(input.children.length).toBe(2)
})
