function createTask (elementDom, title) {
  const element = document.createElement('div')
  element.classList.add('item')

  const text = document.createElement('span')
  text.innerText = title

  const close = document.createElement('span')
  close.classList.add('close')
  close.innerHTML = '\u{2716}'

  element.appendChild(text)
  elementDom.insertAdjacentElement('beforeend', element)
  // callBack(elementDom, title)

  element.addEventListener('mouseover', () => {
    element.insertAdjacentElement('beforeend', close)
  })
  element.addEventListener('mouseout', (event) => {
    if (!event.toElement.classList.contains('close')) {
      close.remove()
    }
  })
}

export const exportCreateTask = () => createTask()
