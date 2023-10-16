import { createTask } from './CreateTask'

function createTaskForm (place, oldElement) {
  const container = place.previousElementSibling

  const addForm = document.createElement('div')
  addForm.classList.add('add-from')
  const textArea = document.createElement('textarea')
  textArea.classList.add('text-input')
  textArea.placeholder = 'Add a task'

  const wrapperBtn = document.createElement('div')
  wrapperBtn.classList.add('wrapper-btn')

  const addBtn = document.createElement('button')
  addBtn.classList.add('add-task')
  addBtn.innerText = 'Добавить карточку'

  const cancelBtn = document.createElement('button')
  cancelBtn.classList.add('cancel-create-task')
  cancelBtn.innerText = 'Отменить создание'

  wrapperBtn.append(addBtn, cancelBtn)
  addForm.append(textArea, wrapperBtn)
  place.append(addForm)

  addBtn.addEventListener('click', () => {
    if (textArea.value) {
      createTask(container, textArea.value)
      addForm.remove()
      place.append(oldElement)
    } else {
      textArea.placeholder = 'Введите текст !'
      textArea.classList.add('input-error')
      setTimeout(() => {
        textArea.placeholder = 'Add a task'
        textArea.classList.remove('input-error')
      }, 2000)
    }
  })

  cancelBtn.addEventListener('click', () => {
    addForm.remove()
    place.append(oldElement)
  })
}

export const exportCreateTaskForm = () => createTaskForm()
