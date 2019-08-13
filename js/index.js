const monsterURL = "http://localhost:3000/monsters"
const monsterContainer = document.getElementById("monster-container")
const formDiv = document.getElementById("create-monster")
let monsterForm = document.createElement("form")
const forwardButton = document.getElementById("forward")
const backButton = document.getElementById("back")
let pageNumber = 1

const fetchMonsters = () => {
   fetch(`${monsterURL}/?_limit=50&_page=${pageNumber}`)
   .then(resp=>resp.json())
   .then(monsters=> {
     console.log(monsters)
     for(const monster of monsters){
        renderMonsters(monster);
     }
   })
}

const renderMonsters = (monster) => {
   let h2 = document.createElement("h2")
   let h4 = document.createElement("h4")
   let p = document.createElement("p")
   let div = document.createElement("div")
   h2.innerText = monster.name
   h4.innerText = `Age: ${monster.age}`
   p.innerText = `Bio: ${monster.description}`
   div.append(h2, h4, p)
   monsterContainer.appendChild(div)
}

const createMonster = (monster) => {
  // Create form
   let monsterForm = document.createElement("form")
   monsterForm.id = "monster-form"
   let nameInput = document.createElement("input")
   nameInput.id = "name"
   nameInput.placeholder = "name..."
   let ageInput = document.createElement("input")
   ageInput.id = "age"
   ageInput.placeholder = "age..."
   let descriptionInput = document.createElement("input")
   descriptionInput.id = "description"
   descriptionInput.placeholder = "description..."
   let btn = document.createElement("button")
   btn.innerText = "Create"
   monsterForm.append(nameInput, ageInput, descriptionInput, btn)
   formDiv.append(monsterForm)
   
  // Respond
   monsterForm.addEventListener("submit", (event) => {
    event.preventDefault()
    fetch(monsterURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: nameInput.value,
            age: ageInput.value,
            description: descriptionInput.value
        })
    })
    .then(resp => resp.json())
    .then(monster => {
      // renderMonsters(monster)
      nameInput.value = ""
      ageInput.value = ""
      descriptionInput.value = ""
    })
  })
}

const nextPage = () => {
  forwardButton.addEventListener('click', (event) => {
    pageNumber++
    console.log(pageNumber)
    monsterContainer.innerHTML = ""
    fetchMonsters()
  })
}

const previousPage = () => {
  backButton.addEventListener('click', () => {
      // event.preventDefault()
      pageNumber--
      console.log(pageNumber)
      monsterContainer.innerHTML = ""
      fetchMonsters()
  })
}

fetchMonsters()
createMonster()
nextPage()
previousPage()