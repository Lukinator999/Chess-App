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
let turn = "W";
function color_moves(piece, square, moves, turn) {
    coloring()
    let player = Array.from(piece)[0];
    if (player == turn) {
        document.getElementById(square).style.backgroundColor = '#ff4036';
        moves.forEach(move => {
            document.getElementById(move).style.backgroundColor = '#dfa800';
        })
    }
    
}
function search_piece() {
    let boxes = document.getElementsByClassName("box");
    let piece;
    Array.from(boxes).forEach(box => {
        if (document.getElementById(box.id).style.backgroundColor == 'rgb(255, 64, 54)') {
            piece = box.id;
        }
    })
    return piece;
}
function promote(square, promotion, turn) {
    let csrftoken = getCookie('csrftoken');
    piece = search_piece();
    fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrftoken
        },
        body: 'square=' + encodeURIComponent(square+promotion.charAt(0)) + '&piece=' + encodeURIComponent(piece) + '&is_move_request=true'
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        document.getElementById(square).textContent = turn + promotion;
        document.getElementById(piece).textContent = "";
        insertImage();
        coloring();
    })
}
document.addEventListener('DOMContentLoaded', function() {
    insertImage();
    coloring();
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach(box => {
        box.addEventListener("click", function() {
            let piece = box.textContent;
            let square = box.id;
            let player = Array.from(piece)[0];
            if (piece != "" && player === turn) {
                let csrftoken = getCookie('csrftoken');
                fetch('', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': csrftoken
                    },
                    body: 'square=' + encodeURIComponent(square) + '&is_legalmove_request=true'
                })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    color_moves(piece, square, data.moves, turn);
                })
            }
            else if (document.getElementById(square).style.backgroundColor == 'rgb(223, 168, 0)') {
                piece = search_piece();
                console.log(document.getElementById(piece).textContent)
                console.log(square.includes("8"), document.getElementById(piece).textContent == "Wpawn ")
                //check for promotion
                if (square.includes("8") && document.getElementById(piece).textContent === "Wpawn ") {
                    let modal1 = document.getElementById('modal1');
                    modal1.style.display = 'block';
                    let optionButtons = document.querySelectorAll('.option-button');
                    optionButtons.forEach(button => {
                        button.addEventListener('click', (event) => {
                            let selectedOption = event.currentTarget.getAttribute('data-option');
                            modal1.style.display = 'none';
                            promote(square, selectedOption, turn);
                            if (turn === "W") {
                                turn = "B";
                            } else {
                                turn = "W";
                            }
                        });
                    });
                } else if (square.includes("1") && document.getElementById(piece).textContent === "Bpawn ") {
                    let modal2 = document.getElementById('modal2');
                    modal2.style.display = 'block';
                    let optionButtons = document.querySelectorAll('.option-button');
                    optionButtons.forEach(button => {
                        button.addEventListener('click', (event) => {
                            let selectedOption = event.currentTarget.getAttribute('data-option');
                            modal2.style.display = 'none';
                            promote(square, selectedOption, turn);
                            if (turn === "W") {
                                turn = "B";
                            } else {
                                turn = "W";
                            }
                        });
                    });
                } else {
                    let csrftoken = getCookie('csrftoken');
                    fetch('', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-CSRFToken': csrftoken
                        },
                        body: 'square=' + encodeURIComponent(square) + '&piece=' + encodeURIComponent(piece) + '&is_move_request=true'
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        document.getElementById(square).textContent = document.getElementById(piece).textContent;
                        document.getElementById(piece).textContent = "";
                        insertImage();
                        coloring();
                        if (turn === "W") {
                            turn = "B";
                        } else {
                            turn = "W";
                        }
                    })
                }              
            }
        });
    });
});