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