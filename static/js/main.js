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
var charToDigi = {
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 4,
    "e": 5,
    "f": 6,
    "g": 7,
    "h": 8
  };
//Coloring
function coloring() {
    let color = document.querySelectorAll('.box');
    color.forEach(color => {
        getId = color.id;
        arr = Array.from(getId);
        pos1 = eval(arr.pop());
        pos2 = charToDigi[arr.pop()];
        sq = pos1 + pos2

        if (sq % 2 == 0) {
            color.style.backgroundColor = '#50f55b';
        }

        if (sq % 2 !== 0) {
            color.style.backgroundColor = '#add8e6';
        }
    })
}
document.addEventListener('DOMContentLoaded', function() {
    insertImage()
    coloring();
    let boxes = document.getElementsByClassName("box");
    console.log(boxes);
    Array.from(boxes).forEach(box => {
        console.log(box);
        box.addEventListener("click", function() {
            piece = box.textContent;
            square = box.id;
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
        })
    })
})