import { createTask } from './crateTask.js/CreateTask'
import { createTaskForm } from './crateTask.js/createTaskForm'
import { StorageControl } from './storage/StorageControl'

export class DomControl {
  constructor () {
    this.StorageControl = new StorageControl()
    this.board = document.querySelector('.board')
    this.block1 = document.querySelector('.block1')
    this.block2 = document.querySelector('.block2')
    this.block3 = document.querySelector('.block3')
    this.actualElement = null
    this.offsetX = null
    this.offsetY = null
    this.place = document.createElement('div')
    this.place.classList.add('empty')
    this.marker = null

    this.board.addEventListener('mousedown', this.dragged)
    this.board.addEventListener('click', this.onClick)
    document.querySelectorAll('.add').forEach(el => el.addEventListener('click', this.onAddAnotherCard))
  }

  init () {
    this.StorageControl.load()
  }

  testData () {
    const task1 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat officiis amet nemo vitae at consequuntur numquam cum, saepe voluptatem eveniet reiciendis tempora consequatur harum iure repellat magni, dolores beatae repudiandae.'
    const task11 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    const task2 = 'Сделать задание 1'
    const task4 = 'Какой то текст задачи'
    const task5 = 'Еще одна задача '
    const task3 = 'Купить кота'

    createTask(this.block1, task1)
    createTask(this.block1, task5)
    createTask(this.block1, task11)
    createTask(this.block2, task4)
    createTask(this.block2, task3)
    createTask(this.block3, task2)

    this.StorageControl.save()
  }

  dragged = (event) => {
    if (event.target.classList.contains('item')) {
      this.offsetX = event.offsetX
      this.offsetY = event.offsetY

      event.preventDefault()
      document.body.style.cursor = 'grabbing'

      this.actualElement = event.target
      this.actualElement.classList.add('dragged')

      document.documentElement.addEventListener('mouseup', this.onMouseUp)
      document.documentElement.addEventListener('mouseover', this.onMouseOver)
    }
  }

  onClick = (event) => {
    if (event.target.classList.contains('close')) {
      event.target.closest('.item').remove()
      this.StorageControl.save()
    }
  }

  onMouseUp = (event) => {
    let currentElement = event.target.closest('.item') || event.target
    if (event.target.classList.contains('empty')) {
      if (this.marker === 'up') {
        currentElement = event.target.nextElementSibling
      } else {
        currentElement = event.target.previousElementSibling
      }
    }

    const currentContainer = currentElement.closest('.container')

    this.place.remove()

    if (currentElement.classList.contains('item')) {
      const { y, height } = currentElement.getBoundingClientRect()
      if (event.clientY < height / 2 + y && event.clientY > y) {
        currentElement.insertAdjacentElement('beforebegin', this.actualElement)
      } else {
        currentElement.insertAdjacentElement('afterend', this.actualElement)
      }
    } else {
      currentContainer.insertAdjacentElement('beforeend', this.actualElement)
    }

    this.actualElement.style.top = ''
    this.actualElement.style.left = ''

    this.actualElement.classList.remove('dragged')
    this.actualElement = null

    document.body.style.cursor = 'auto'
    document.documentElement.removeEventListener('mouseup', this.onMouseUp)
    document.documentElement.removeEventListener('mouseover', this.onMouseOver)
    this.StorageControl.save()
  }

  onMouseOver = (event) => {
    if (event.target && event.target.classList.contains('item')) {
      const { y, height } = event.target.getBoundingClientRect()
      this.place.style.height = this.actualElement.getBoundingClientRect().height + 'px'

      if (event.clientY < height / 2 + y && event.clientY > y) {
        event.target.insertAdjacentElement('beforebegin', this.place)
        this.marker = 'up'
      }
      if (event.clientY > height / 2 + y && event.clientY < y + height) {
        event.target.insertAdjacentElement('afterend', this.place)
        this.marker = 'down'
      }
    }

    if (this.actualElement) {
      this.actualElement.style.top = event.clientY - this.offsetY + 'px'
      this.actualElement.style.left = event.clientX - this.offsetX + 'px'
    }
  }

  onAddAnotherCard = (event) => {
    const place = event.target.closest('.footer')
    event.target.remove()
    createTaskForm(place, event.target)
  }
}
