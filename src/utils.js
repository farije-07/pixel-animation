export function findAndRemoveFromList(list, element) {
    var index = list.indexOf(element);
    if (index > -1) {
        list.splice(index, 1);
    } else {
        console.log("Element not found");
    }
}







const elementsToRender = new Set()

function watchElement(obj) {
  if (!elementsToRender.has(obj)) {
    elementsToRender.add(obj)
  }
  console.log(elementsToRender)
  renderAllElements()
}

function renderAllElements() {
  elementsToRender.forEach((elem) => renderPlayer(elem))
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}

function checkPlayerContainer() {
    let container = document.querySelector("#character")
    if (container == null) {
        container = document.createElement("div")
        container.setAttribute("id", "character")
        document.body.appendChild(container)
    }
    return container
}


function renderPlayer(obj) {

  const playerContainer = checkPlayerContainer()

  let playerElement = null
  console.log(obj.id)
  if (obj.id) {
    playerElement = document.getElementById(obj.id)
  } else {
    console.log("create element")
    let id = `player-${playerContainer.childElementCount}`
    obj.id = id
    playerElement = document.createElement("div")
    playerElement.setAttribute("id", id)
    playerElement.classList.add("player")
    playerContainer.appendChild(playerElement)
  }


  let actions = []
  let buttons = []
  Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).forEach((prop) => {
    if (typeof obj[prop] === "function" && prop.startsWith("action")) {
      let name = prop.toString().substring("action".length).toLowerCase()
      actions.push(name)
      buttons = buttons + `<button class="${name}">${capitalize(name)}</button>`
    }
  })

  let stats = ""
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    if (prop.startsWith("stats")) {
      let name = capitalize(prop.substring("stats".length))
      stats = stats + `<p>${name}: ${obj[prop]}</p>`
    }
  })

  console.log(playerElement)
  playerElement.innerHTML = `
        <h2>${obj.name}</h2>
        ${stats}
        ${buttons}`

  actions.forEach((a) => {
    playerElement.querySelector(`.${a}`).addEventListener("click", () => {
      obj[`action${capitalize(a)}`]()
      renderAllElements()
    })
  })
}

let errorTimeout = null

function errorLog(msg) {
  let err = document.querySelector("#err-msg")
  if (err == null) {
    err = document.createElement("div")
    err.setAttribute("id", "err-msg")
    document.body.appendChild(err)
  }
  err.addEventListener("click", () => (err.style.display = "none"))
  err.textContent = msg
  err.style.display = "flex"
  if (errorTimeout) {
    clearTimeout(errorTimeout)
    errorTimeout = null
  }
  errorTimeout = setTimeout(() => (err.style.display = "none"), 5000)
}
