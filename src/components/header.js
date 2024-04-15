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
    // let color = [];
    // for (let i = 0; i < 3; i++) {
    //     color.push(Math.floor(Math.random() * 256));
    // }
    // currentRandomColor = "rgb(" + color.join(", ") + ")";
    // return currentRandomColor;
    // return "rgb(0, 0, 255)";

    let h = Math.random() * 360
    let s = 70
    let l = 60

    let rgbcolor = [];
    rgbcolor = hslToRgb(h, s, l);

    currentRandomColor = rgbcolor;

    return "hsl(" + h + "," + s + "%," + l + "%)"
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

function lightOrDarkColor(color) {
    // Variables for red, green, blue values
    var r, g, b, hsp;

    // If RGB --> store the red, green, blue values in separate variables
    // color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = color[0];
    g = color[1];
    b = color[2];

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

    if (firstClick && document.getElementById("helper")) {
        document.getElementById("helper").classList.add("opacity-0");
    }
    tempBgColor = "rgb(" + currentRandomColor.join(", ") + ")"

    document.getElementById("header").style.backgroundColor = tempBgColor;
    document.getElementById("nav").style.backgroundColor = tempBgColor;

    if (document.getElementById("clearer")) {
        document.getElementById("clearer").classList.remove('hidden')
        document.getElementById("clearer").classList.add('block')
    }

    for (let letter of letters) {
        if (letter.innerHTML == "¤") {
            letter.style.color = tempBgColor;
        }
    }
    firstClick = false;

    if (lightOrDarkColor(currentRandomColor) == 'dark') {
        this.classList.remove("text-black")
        this.classList.add("text-white")
        if (document.getElementById('clearer')) {
            document.getElementById('clearer').classList.remove("text-black")
            document.getElementById('clearer').classList.add("text-white")
        }
    } else {
        this.classList.add("text-black")
        this.classList.remove("text-white")
        if (document.getElementById('clearer')) {
            document.getElementById('clearer').classList.add("text-black")
            document.getElementById('clearer').classList.remove("text-white")
        }
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

let myElementToCheckIfClicksAreInsideOf = document.querySelector('#manipulate');

if (document.getElementById("clearer")) {
    document.getElementById("clearer").addEventListener("click", function () {

        document.getElementById("manipulate").classList.add("text-black")
        document.getElementById("manipulate").classList.remove("text-white")
        document.getElementById("header").style.backgroundColor = "white";
        document.getElementById("nav").style.backgroundColor = "white";
        this.classList.add('hidden')
        this.classList.remove('block')

    });
}

let currentRandomColor;

for (let letter of letters) {
    letter.classList.add("font-serif")

    letter.addEventListener("mouseenter", function () {
        letter.style.color = randomColor();
        // if (letter.innerHTML == "¤" || letter.innerHTML === ' ') {
        //     letter.style.backgroundColor = letter.style.color;
        // }
        // let randomInt = getRandomInt(1, 4);
        if (document.fonts.ready) {
            letter.classList.remove("font-serif")
            if (document.getElementById("helper")) {
                document.getElementById("helper").classList.remove("text-white");
            }
        }
    });
    letter.addEventListener("mouseout", function () {
        setTimeout(function () {
            letter.removeAttribute("style");
            letter.classList.add("font-serif");
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

const hslToRgb = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
}