function newGame(rating) {
    window.location.href = `/game/${rating}/`
}
function insertImage() {
    document.querySelectorAll('.box').forEach(image => {
        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                var imageName = image.innerText;
                var imageUrl = staticImagePath + imageName + ".png";
                image.innerHTML = `${image.innerText} <img class='allimg allpawn' src="${imageUrl}" alt="">`;
                image.style.cursor = 'pointer'
            }

            else {
                var imageName = image.innerText;
                var imageUrl = staticImagePath + imageName + ".png";
                image.innerHTML = `${image.innerText} <img class='allimg' src="${imageUrl}" alt="">`;
                image.style.cursor = 'pointer'
            }
        }
    })
}
//Coloring
function coloring() {
    const color = document.querySelectorAll('.box')
    color.forEach(color => {
        getId = color.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        aup = eval(arr.shift())
        a = aside + aup

        if (a % 2 == 0) {
            color.style.backgroundColor = '#598C58'
        }

        if (a % 2 !== 0) {
            color.style.backgroundColor = '#296d98'
        }
    })
}