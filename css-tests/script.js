console.log('I am here')

// when button .expender is clicked we want to add a class to the body
// select all buttons
const buttons = document.querySelectorAll('.expender')

// add onclick event on each button
buttons.forEach(function(button){
    button.onclick = function(){

        let allBoxes = document.querySelectorAll('.box')
        allBoxes.forEach(function(box){ 
                
            // if the box is not the one that was clicked, close it
            if (box != button.parentElement){
                box.classList.remove('expanded') 
            }
                box.querySelector('.button-content').innerHTML = '&#43;'   // reset all buttons to +
        })

        // Turn on and off
        button.parentElement.classList.toggle('expanded');

        // Change the button + -
        let buttonContent = button.querySelector('.button-content')
        if (button.parentElement.classList.contains('expanded')){
            buttonContent.innerHTML = '&#8210;'
        }else{
            buttonContent.innerHTML = '&#43;'
        } 


        // if any of the .box is exanded add .grid expanded to grid-container
        let grid = document.querySelector('.grid-container')
        let expanded = false
        allBoxes.forEach(function(box){
            if (box.classList.contains('expanded')){
                expanded = true
            }
        })
        if (expanded){
            grid.classList.add('grid-expanded')
        }
        else{
            grid.classList.remove('grid-expanded')
        }
    }
})

let closeButtons = document.querySelectorAll('.collapser')
closeButtons.forEach(function(button){
    button.onclick = function(){
        let box = button.parentElement;
        box.classList.remove('expanded')
    }
})

// ---- PREPAREDNESS ----

async function fetchData(url){

    let apikey = process.env.AIRTABLE_KEY
    let apikey2 = process.env.AIRTABLE_REPO_KEY
    let Bearer = 'Bearer ' + apikey
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': Bearer
    }

    let data = await fetch(url, {headers: headers})
    return data.json()
}

let url = 'https://api.airtable.com/v0/appvTkmJJRpz8x95D/Preparedness'
let data = fetchData(url)

// Does #prepare-box's parent have the class expanded?
let prepareBox = document.querySelector('#prepare-box')
prepareBox.onclick = function(){
    if (prepareBox.classList.contains('expanded')){
        console.log('Prepare box is expanded')
        prepareBox.querySelector('.box-content').innerHTML = 'Prepare is clicked'


        data.then(function(data){
            console.log( "Data is Ready from Airtable" )
            let prepareBox = document.querySelector('#prepare-box')
            let prepareBoxContent = prepareBox.querySelector('.box-content')
            prepareBoxContent.innerHTML = ''
            data.records.forEach(function(record){
                let title = record.fields.Title
                let content  = record.fields.Content
                
                prepareBoxContent.innerHTML += `<h3>${title}</h2><p>${content}</p>`
                

            })
        })



    }else{
        console.log('Prepare box is not expanded')
        prepareBox.querySelector('.box-content').innerHTML = 'Prepare'


    }

}

