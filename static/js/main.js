function newGame(rating) {
    window.location.href = `/game/${rating}/`
}
// Funktion zum Herausfindes des Cookies für das Senden an den Server
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
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
let boxes = document.getElementsByClassName("box");
boxes.forEach(box => {
    box.addEventListener("click", function() {
        piece = box.textContent
        square = box.id
        if (piece != "") {
            let csrftoken = getCookie('csrftoken');
            fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrftoken
                },
                body: 'square=' + encodeURIComponent(square) + '&is_legalmoves_request=true'
            })
            .then(data => {
                
            })
            .catch(error => {
                reject(error);
            })
        }
    });
})
