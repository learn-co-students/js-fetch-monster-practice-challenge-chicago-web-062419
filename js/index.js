//Create a form, should have name, age and description, and a 'Create Monster Button'
const createMonsterDiv = document.getElementById("create-monster")
const monsterContainer = document.getElementById("monster-container")
const nextButton = document.getElementById("forward")
const backButton = document.getElementById("back")
let createForm = document.createElement("form")
let monsterArray

let lastID

createForm.innerHTML= 
    `Monster Name:
    <input class="name" type="text">
    Monster Age:
    <input class="age" type="text">
    Description
    <input class="bio" type="text">
    <button type="submit">Create Monster</button>`;

createMonsterDiv.appendChild(createForm)

//Load first 50 monsters
const getMonsters = ()=>{
    fetch('http://localhost:3000/monsters')
        .then(res => res.json())
        .then(monsterJSON => {
            monsterArray = monsterJSON.map(x => x)
            createCards(monsterJSON.slice(0,50))
            lastID = 50
        })
        
}

const createCards = (array) => {
    array.forEach(monster => {
        let card = document.createElement("div")
        let name = document.createElement("h2")
        let age = document.createElement("p")
        let description = document.createElement("p")
        let hr = document.createElement("hr")
        name.innerHTML = monster.name
        age.innerHTML = `Age: ${parseInt(monster.age)}`
        description.innerHTML = `Bio: ${monster.description}`
        card.append(name, age, description, hr)
        monsterContainer.appendChild(card)
    })
}

getMonsters()


//Next Button functions


nextButton.addEventListener("click", ()=>{
    
    fetch('http://localhost:3000/monsters')
        .then(res => res.json())
        .then(monsterJSON => {
            monsterContainer.innerHTML = ""
            createCards(monsterJSON.slice(lastID, lastID + 50))
            lastID = Number(lastID) + 50
        })
})


backButton.addEventListener("click", ()=>{
    
    if(lastID > 50){
    fetch('http://localhost:3000/monsters')
        .then(res => res.json())
        .then(monsterJSON => {
                console.log("clickd")
                monsterContainer.innerHTML = ""
                createCards(monsterJSON.slice(lastID - 100, lastID - 50))
               
                lastID = Number(lastID) - 50
            
        })
    } 
})
