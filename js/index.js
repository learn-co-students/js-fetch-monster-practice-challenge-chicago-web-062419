/////////////// CREATE VARIABLES FOR KEY ELEMENTS ///////////

let URL = "http://localhost:3000/monsters"
const h1 = document.querySelector('h1')
const monsterDiv = document.getElementById('create-monster')
const monsterContainer = document.getElementById('monster-container')
const backButton = document.getElementById('back')
const forwardButton = document.getElementById('forward')
let pageNumber = 1


/////////////////// CREATE THE FORM ///////////////////////

const createForm = () => {
    let form = document.createElement('form')
    form.id = 'monster-form'
    let nameInput = document.createElement('input')
    nameInput.id = 'name'
    nameInput.placeholder = "name"
    let ageInput = document.createElement('input')
    ageInput.id = 'age'
    ageInput.placeholder = "age"
    let descriptionInput = document.createElement('input')
    descriptionInput.id = 'description'
    descriptionInput.placeholder = "description"
    
    let button = document.createElement("button")
    button.innerText = "Create"
    button.addEventListener("click", (event) => {
        createMonster(event)})
    
    form.append(nameInput, ageInput, descriptionInput, button)
    monsterDiv.appendChild(form)
}

////////////////////////// FETCH THE MONSTERS ///////////////////////

const getMonsters = (URL) => {
    fetch(`${URL}/?_limit=50&_page=${pageNumber}`)
      .then(res => res.json())
      .then(monsters => {
        // let a = 0
        // let b = 50 
        // let monster50 = monsters.slice(a, b)
        monsters.forEach(monster => {
            renderMonster(monster)
        })
      })
}


////////////////////// RENDER MONSTERS ///////////////////////////
const renderMonster = (monster) => {

    const h2 = document.createElement('h2')
    const h4 = document.createElement('h4')
    const p = document.createElement('p')

    h2.innerText = `Name: ${monster.name}`
    h4.innerText = `Age: ${monster.age}`
    p.innerText = `Description: ${monster.description}`

    monsterContainer.appendChild(h2)
    monsterContainer.appendChild(h4)
    monsterContainer.appendChild(p)

}

///////////////////// CREATE NEW MONSTER POST /////////////////////////
const createMonster = (monster) => {

    event.preventDefault()

    let name = document.getElementById('name')
    let age = document.getElementById('age')
    let description = document.getElementById('description')


    fetch(URL, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            age: age.value,
            description: description.value
            })
        })
        .then(res => res.json())
        .then(monster => {
            renderMonster(monster)
            name.value = ""
            age.value = ""
            description.value = ""
    })
}

const forward = () => {
    forwardButton.addEventListener("click", (event) => {
        event.preventDefault()
        pageNumber++
        monsterContainer.innerHTML = ""
        getMonsters(URL)
    })
}

const back = () => {
    backButton.addEventListener("click", (event) => {
        event.preventDefault()
        if (pageNumber > 0) {
            pageNumber--
            monsterContainer.innerHTML = ""
            getMonsters(URL)
        }
    })
}


///////////////////// CALL ALL FUNCTIONS //////////////////////////

createForm()
getMonsters(URL)
forward(URL)
back(URL)




//////////////////////////////// ORIGINAL CODE FOR THE FORWARD AND BACK /////////////////////

        // forwardButton.addEventListener("click", (event) => {
        //     monsterContainer.innerHTML = ""
        //     a += 50
        //     b += 50
        //     monsters.slice(a,b).forEach(monster => {
        //         renderMonster(monster)})
        // })

        // backButton.addEventListener("click", (event) => {
        //     if (a > 0) {
        //         monsterContainer.innerHTML = ""
        //         a -= 50
        //         b -= 50 
        //         monsters.slice(a,b).forEach(monster => {
        //             renderMonster(monster)})
        //     }
        // })
