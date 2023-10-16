/**
 * @jest-environment jsdom
*/
import { whereValidate } from '../components/validators/vflidWhereDate'

beforeAll(() => {
  document.querySelector('body').innerHTML = '<div class=\'calendar-widget\'></div>'
})

test('test validator true', () => {
  const date1 = new Date('2023-10-12')
  const date2 = new Date('2023-10-16')

  const valid = whereValidate(date1.toDateString(), date2.toDateString())

  expect(valid).toBe(true)
})

test('test validator false', () => {
  const date1 = new Date('2023-10-12')
  const date2 = new Date('2023-10-16')

  const valid = whereValidate(date2.toDateString(), date1.toDateString())

  expect(valid).toBe(false)
})
test('test validator error form', () => {
  const date1 = new Date('2023-10-12')
  const date2 = new Date('2023-10-16')

  whereValidate(date2.toDateString(), date1.toDateString())
  const error = document.querySelector('.invalid-date')
  expect(error).toBeTruthy()
})
test('test validator error form remove', () => {
  const date1 = new Date('2023-10-12')
  const date2 = new Date('2023-10-16')

  whereValidate(date2.toDateString(), date1.toDateString())
  setTimeout(() => {
    const error = document.querySelector('.invalid-date')
    expect(error).toBe(null)
  }, 4000)
})
