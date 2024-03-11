let mode = 0;

let array = document.getElementById("manipulate").textContent.split(" ");
array.forEach((item) => { });
document.getElementById("manipulate").innerHTML = "";

let fontMode = 0;

array.forEach((item) => {
    let tempSpan = document.createElement("span");
    // tempSpan.classList.add("inline-block");

    let spaceSpan = document.createElement("span");
    spaceSpan.innerHTML = " ";

    let tempArray = item.split("");

    tempArray.forEach((char) => {
        let tempCharSpan = document.createElement("span");
        tempCharSpan.innerHTML = char;
        tempCharSpan.classList.add("manipulable");
        spaceSpan.classList.add("manipulable");

        if (tempCharSpan.textContent == "¤") {
            tempCharSpan.classList.add("text-white");
            tempCharSpan.classList.add("break-words");
        }

        tempSpan.append(tempCharSpan);
    });

    if (array[array.length] != item) {
        document.getElementById("manipulate").append(spaceSpan);
    }
    document.getElementById("manipulate").append(tempSpan);
});

function randomColor() {
    let color = [];
    for (let i = 0; i < 3; i++) {
        color.push(Math.floor(Math.random() * 256));
    }
    currentRandomColor = "rgb(" + color.join(", ") + ")";
    return currentRandomColor;
    // return "rgb(0, 0, 255)";
}

const colors = [
    "#0000FF",
    // "#00FF00",
    "#FF0000",
    // "#FF00FF",
    "#28965A",
    "#AA6DA3",
    "#4DFFF3",
    "#CAFF8A",
    "#4F3130",
    "#F7E733",
    "#BDD5EA",
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor() {
    return colors[getRandomInt(0, colors.length - 1)];
}

function lightOrDarkColor(color) {
    // Variables for red, green, blue values
    var r, g, b, hsp;

    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = color[1];
    g = color[2];
    b = color[3];
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {

        return 'light';
    }
    else {

        return 'dark';
    }
}

let letters = document.getElementsByClassName("manipulable");

let firstClick = true;
let tempBgColor;

document.getElementById("manipulate").addEventListener("click", function () {
    // if (firstClick) {
    tempBgColor = currentRandomColor;
    document.getElementById("manipulate").parentElement.style.backgroundColor = tempBgColor;
    for (let letter of letters) {
        if (letter.innerHTML == "¤") {
            letter.style.color = tempBgColor;
        }
    }
    firstClick = false;

    if (lightOrDarkColor(currentRandomColor) == 'dark') {
        this.classList.remove("text-black")
        this.classList.add("text-white")
    } else {
        this.classList.add("text-black")
        this.classList.remove("text-white")
    }
    // } else {
    //     document.getElementById("manipulate").parentElement.style.backgroundColor = "white";
    //     firstClick = true;
    //     for (let letter of letters) {
    //         if (letter.innerHTML == "¤") {
    //             letter.style.color = "white";
    //         }
    //     }
    // }
});

let currentRandomColor;

for (let letter of letters) {
    letter.classList.add("font-mono")

    letter.addEventListener("mouseenter", function () {
        letter.style.color = randomColor();
        // if (letter.innerHTML == "¤" || letter.innerHTML === ' ') {
        //     letter.style.backgroundColor = letter.style.color;
        // }
        // let randomInt = getRandomInt(1, 4);
        if (document.fonts.ready) {
            letter.classList.remove("font-mono")
        }
    });
    letter.addEventListener("mouseout", function () {
        setTimeout(function () {
            letter.removeAttribute("style");
            letter.classList.add("font-mono");
            if (letter.innerHTML == "¤" && !firstClick) {
                if (!firstClick) {
                    letter.style.color = tempBgColor
                } else {
                    letter.style.color = "white"
                }
            }
        }, 1000);
    });
}