/**
 [X] Create grid of divs 
 [ ] Create hover effect on mouseOver event
 [ ] create clear button 
 [ ] Create grid size with user selection (max 100  X 100 grid)
 [ ] optional:
    [ ] create radom RGB trail
    [ ] create 10% black on each mouseover 
*/

let input = 50;
let container = document.querySelector('#container');

// Make grid divs
let newDiv = document.createElement('div')

// set size of divs
let containerWidth = container.clientWidth
newDiv.style.width = `${containerWidth / input}px`;
newDiv.style.height = `${containerWidth / input}px`;

// Set grid columns based on input
container.style.gridTemplateColumns = `${gridSize()}`

function gridSize() {
    let gridColumns = ''
    for (let i = 0; i < input; i++) {
        gridColumns += 'auto ';
    };
    return gridColumns;
};

// Append newDivs to container
for (let i = 0; i < input; i++) {
    for (let j = 0; j < input; j++) {
        container.appendChild(newDiv.cloneNode(true));
    }
}

// create random colour
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

// Change color on mouseOver
let pixels = container.querySelectorAll("div");

pixels.forEach((pixel) => {

    pixel.addEventListener('mouseover', () => {
        if (rainbowTrue === true && greyTrue === false) {
            pixel.style.background = random_rgba();
        } else if (greyTrue === true && rainbowTrue === false) {
            pixel.style.backgroundColor = "black";
            pixel.style.opacity = (parseFloat(pixel.style.opacity) || 0) + 0.2;
        } else {
            pixel.style.background = "black";
        }
    });
});

let greyTrue;
document.getElementById('grey').onclick = () => {
    greyTrue = true;
    rainbowTrue = false;
}

let rainbowTrue;
document.getElementById('rainbow').onclick = () => {
    greyTrue = false;
    rainbowTrue = true;
}

// Range slider
let slider = document.getElementById("myRange");
let sliderValue = document.getElementById("value")

sliderValue.innerHTML = slider.value;

slider.oninput = function() {
    sliderValue.innerHTML = this.value;
}

function sliderSelection () {
    slider.addEventListener('mouseup', () => {
        // get new input
        let newInput = parseInt(sliderValue.innerHTML);
        console.log(newInput)
        // reset grid
        container.innerHTML = '';
        container.style.gridTemplateColumns = ``;
    
        function newGridSize() {
            let gridColumns = ''
            for (let i = 0; i < newInput; i++) {
                gridColumns += 'auto ';
            };
            return gridColumns;
        };
        container.style.gridTemplateColumns = `${newGridSize()}`;
    
        // Append newDivs to container
        newDiv.style.width = `${containerWidth / newInput}px`;
        newDiv.style.height = `${containerWidth / newInput}px`;
    
        for (let i = 0; i < newInput; i++) {
            for (let j = 0; j < newInput; j++) {
                container.appendChild(newDiv.cloneNode(true));
            }
        }
    
        const newPixels = container.querySelectorAll("div");
    
        newPixels.forEach((pixel) => {

            pixel.addEventListener('mouseover', () => {
                if (rainbowTrue === true && greyTrue === false) {
                    pixel.style.background = random_rgba();
                } else if (greyTrue === true && rainbowTrue === false) {
                    pixel.style.backgroundColor = "black";
                    pixel.style.opacity = (parseFloat(pixel.style.opacity) || 0) + 0.2;
                } else {
                    pixel.style.background = "black";
                }
            });
        });
    })
}

slider.addEventListener('mouseup', sliderSelection())

// add clear button
let clearBtn = document.querySelector('#clear');

clearBtn.addEventListener('click', () => {
    let whiteout = container.querySelectorAll("div");

    whiteout.forEach((square) => {
        square.style.background = 'white';
    })
})
