const createDiv = document.getElementById('create-monster')
const monsterDiv = document.getElementById('monster-container')
const url = "http://localhost:3000/monsters"
let monsterArray
const nextButton = document.getElementById("forward")
const backButton = document.getElementById("back")
let currentPage
let lastId

let createForm = document.createElement("form")
createForm.innerHTML = `
Monster Name: <input class='name-field' name='name' type='text'>
Monster Age: <input class='age-field' name='age' type='text'>
Monster Bio: <input class='bio-field' name='bio' type='text'>
<button type='submit'>Submit</button>  `
createDiv.appendChild(createForm)

//Load monster cards
const createCards = (array) => {
    array.forEach(monster => {
        let card = document.createElement("div")
        let name = document.createElement("h2")
        let age = document.createElement("p")
        let bio = document.createElement("p")
        let hr = document.createElement("hr")
        name.innerText = monster.name
        age.innerText = parseInt(monster.age)
        bio.innerText = monster.description
        card.append(name, age, bio, hr)
        monsterDiv.appendChild(card)
    })
}


const loadMonsters = () => {
    fetch (url)
    .then(res => res.json())
    .then(monsters => {
        monsterArray = monsters.map(x => x)
        createCards(monsters.slice(0,50))
        lastId = 50
    })
}

const nextPage = () => {
    nextButton.addEventListener("click", () => {

        fetch (url)
            .then(res => res.json())
            .then(monsters => {
                monsterDiv.innerHTML = ""
                createCards(monsters.slice(lastId, lastId + 50))
                lastId = Number(lastId) + 50
            })
        })
}

const prevPage = () => {
    backButton.addEventListener("click", () => {
        if (lastId > 50) {
        fetch (url)
            .then(res => res.json())
            .then(monsters => {
                    monsterDiv.innerHTML = ""
                    createCards(monsters.slice(lastId -100, lastId - 50))
                    lastId = Number(lastId) - 50
            })
        }
    })    
}
    


loadMonsters()
nextPage()
prevPage()