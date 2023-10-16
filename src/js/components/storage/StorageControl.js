import Task from './Task'
import { createTask } from '../crateTask.js/CreateTask'

export class StorageControl {
  constructor () {
    this.storage = []
    this.blocks = [document.querySelector('.block1'), document.querySelector('.block2'), document.querySelector('.block3')]
  }

  load () {
    this.storage = []
    const data = JSON.parse(localStorage.getItem('Tasks'))
    if( data) {
            data.forEach((task) => {
                this.storage.push(new Task(task.domElement, task.text))
                createTask(document.querySelector(`.${task.domElement}`), task.text)
            })
        }
    }

  save () {
    this.storage = []
    this.blocks.forEach((block) => {
      block.querySelectorAll('.item').forEach((item) => {
        this.storage.push(new Task(block.classList[1], item.querySelector('span').innerText))
      })
    })

    localStorage.setItem('Tasks', JSON.stringify(this.storage))
  }
}
