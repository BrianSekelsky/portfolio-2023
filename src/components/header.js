let mode = 0;

let array = document.getElementById("manipulate").textContent.split(" ");
array.forEach((item) => { });
document.getElementById("manipulate").innerHTML = "";

let fontMode = 0;

// document.getElementById("manipulate").addEventListener("click", function () {
//   if (fontMode == 0) {
//     document.getElementById("manipulate").classList.remove("font-serif");
//     document.getElementById("manipulate").classList.add("font-sans");
//     fontMode = 1;
//   } else if (fontMode == 1) {
//     document.getElementById("manipulate").classList.remove("font-sans");
//     document.getElementById("manipulate").classList.add("font-serif");
//     fontMode = 0;
//   }
// });
// document.getElementById("manipulate").classList.add("font-sans");

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

        if (tempCharSpan.textContent != " ") {
            // tempCharSpan.classList.add("inline-block");
            // tempCharSpan.classList.add("transition-all");
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
    return "rgb(" + color.join(", ") + ")";
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

let letters = document.getElementsByClassName("manipulable");

for (let letter of letters) {
    // letter.addEventListener("mouseenter", function () {
    //   let randomInt = getRandomInt(1, 4);
    //   // letter.style.transform = "translate(30px)"
    //   letter.style.color = randomColor();
    //   // letter.style.transform = "scale(1.4)"
    //   if (randomInt === 1) {
    //     letter.style.transform = "skew(10deg, 20deg)";
    //     // letter.classList.add("font-sans");
    //   } else if (randomInt === 2) {
    //     letter.style.transform = "skew(20deg, 30deg)";
    //   } else if (randomInt === 3) {
    //     letter.style.transform = "skew(30deg, -10deg)";
    //   } else if (randomInt === 4) {
    //     letter.style.transform = "skew(0deg, -20deg)";
    //   }
    //   setTimeout(function () {
    //     letter.removeAttribute("style");
    //     letter.classList.remove("font-sans");
    //   }, 1000);
    // });
    letter.addEventListener("mouseenter", function () {
        letter.style.color = randomColor();
        let randomInt = getRandomInt(1, 4);
        if (randomInt === 1) {
            letter.classList.add("font-bold");
            letter.classList.add("uppercase");
            // letter.style.transform = "skew(10deg, 20deg)";
            // letter.style.transform = "translate(50px, 50px)";
        } else if (randomInt === 2) {
            letter.classList.add("font-bold");
            letter.classList.add("uppercase");
            // letter.style.transform = "skew(20deg, 30deg)";
            // letter.style.transform = "translate(-50px, -50px)";
        } else if (randomInt === 3) {
            letter.classList.add("font-bold");
            letter.classList.add("uppercase");
            // letter.style.transform = "skew(30deg, -10deg)";
            // letter.style.transform = "translate(-50px, 50px)";
        } else if (randomInt === 4) {
            letter.classList.add("font-bold");
            letter.classList.add("uppercase");
            // letter.style.transform = "skew(0deg, -20deg)";
            // letter.style.transform = "translate(50px, -50px)";
        }
        setTimeout(function () {
            letter.removeAttribute("style");
            letter.classList.remove("font-bold");
            letter.classList.remove("uppercase");
        }, 2000);
    });
}