/**
 * @jest-environment jsdom
*/
import { Calendar } from '../components/Calendar/Calendar'
import moment from 'moment'

beforeAll(() => {
  document.querySelector('body').innerHTML = `<div class='calendar-widget'></div>
    <table><tr><td>${moment().format('DD')}</td></tr></table>`
})

test('test calendar element create', () => {
  const calendar = new Calendar()
  const year = +moment().format('YYYY')
  const month = +moment().format('MM')
  const container = document.querySelector('.calendar-widget')
  calendar.create(container, year, month)
  const result = document.querySelector('.calendar__header')
  expect(result).toBeTruthy()
})

test('test calendar point today', () => {
  const calendar = new Calendar()
  const year = +moment().format('YYYY')
  const month = +moment().format('MM')
  console.log(month)
  const container = document.querySelector('.calendar-widget')
  calendar.create(container, year, month)
  // console.log(element);
  const result = document.querySelector('.today')
  expect(result).toBeTruthy()
})
test('test calendar point inactive', () => {
  const calendar = new Calendar()
  const year = +moment().format('YYYY')
  const month = +moment().format('MM')
  const container = document.querySelector('.calendar-widget')
  calendar.create(container, year, month)
  const result = document.querySelector('.inactive')
  expect(result).toBeTruthy()
})
test('test calendar point inactive another month', () => {
  const calendar = new Calendar()
  const year = +moment().format('YYYY')
  const month = +moment().format('MM') - 2
  const container = document.querySelector('.calendar-widget')
  calendar.create(container, year, month)
  const result = document.querySelector('.inactive')
  expect(result).toBeTruthy()
})
test('test calendar point inactive another year', () => {
  const calendar = new Calendar()
  const year = +moment().format('YYYY') - 2
  const month = +moment().format('MM')
  const container = document.querySelector('.calendar-widget')
  calendar.create(container, year, month)
  const result = document.querySelector('.inactive')
  expect(result).toBeTruthy()
})
