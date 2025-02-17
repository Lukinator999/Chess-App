// Load new game
function newGame(rating) {
    if (rating !== 0)
        window.location.href = `/game/${rating}/`
    else
        window.location.href = '/game/'
}
// get cookie to connect to server
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
// delete cookie
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
// insert all images at the right square
function insertImage() {
    document.querySelectorAll('.box').forEach(image => {
        if (image.innerText.length !== 0) {
            let imageName = image.innerText;
            let imageUrl = staticImagePath + imageName + ".png";
            image.style.cursor = 'pointer'
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {     
                image.innerHTML = `${image.innerText} <img class='allimg allpawn' src="${imageUrl}" alt="">`;
            } else if (image.innerText == 'Wbishop' || image.innerText == 'Bbishop') {
                image.innerHTML = `${image.innerText} <img class='allimg allbishop' src="${imageUrl}" alt="">`;
            } else if (image.innerText == 'Wqueen' || image.innerText == 'Bqueen') {
                image.innerHTML = `${image.innerText} <img class='allimg allqueen' src="${imageUrl}" alt="">`;
            } else {
                image.innerHTML = `${image.innerText} <img class='allimg' src="${imageUrl}" alt="">`;  
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
// color the squares in different colores
function coloring() {
    let color = document.querySelectorAll('.box');
    color.forEach(color => {
        color.style.color = "transparent";

        getId = color.id;
        arr = Array.from(getId);
        pos1 = eval(arr.pop());
        pos2 = charToDigi[arr.pop()];
        sq = pos1 + pos2

        if (sq % 2 == 0) {
            color.style.backgroundColor = '#2ab033';
        }

        if (sq % 2 !== 0) {
            color.style.backgroundColor = '#85b4c4';
        }
    })
}
// colores active and attacked squares
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
// search the active piece
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
// turn king if lost
function turn_king(turn) {
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach(box => {
        if (box.textContent === "Wking " && turn === "B") {
            box.lastChild.style.transform = "rotate(180deg)";
        } else if (box.textContent === "Bking " && turn === "W") {
            box.lastChild.style.transform = "rotate(180deg)";
        }
    })
}
// send promotion to server
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
        document.getElementById(square).textContent = turn + promotion;
        document.getElementById(piece).textContent = "";
        insertImage();
        coloring();
        update_score();
    })
}
// update score on screen
function update_score() {
    let boxes = document.getElementsByClassName("box");
    let score = 0;
    let wqueen = 0;
    let bqueen = 0;
    let wrook = 0;
    let brook = 0;
    let wbishop = 0;
    let bbishop = 0;
    let wknight = 0;
    let bknight = 0;
    let wpawn = 0;
    let bpawn = 0;
    let white_pieces_string = "";
    let black_pieces_string = "";
    let score_screen_w = document.getElementById("white_score");
    let score_screen_b = document.getElementById("black_score");
    let score_white = "";
    let score_black = "";

    Array.from(boxes).forEach(box => {
        if (box.textContent === "Wqueen ") {
            score += 9;
            wqueen +=1;
        } else if (box.textContent === "Bqueen ") {
            score -= 9;
            bqueen +=1;
        } else if (box.textContent === "Wrook ") {
            score += 5; 
            wrook +=1;
        } else if (box.textContent === "Brook ") {
            score -= 5;
            brook +=1;
        } else if (box.textContent === "Wbishop ") {
            score += 3;
            wbishop +=1;
        } else if (box.textContent === "Bbishop ") {
            score -= 3;
            bbishop +=1;
        } else if (box.textContent === "Wknight ") {
            score += 3;
            wknight +=1;
        } else if (box.textContent === "Bknight ") {
            score -= 3;
            bknight +=1;
        } else if (box.textContent === "Wpawn ") {
            score += 1;
            wpawn += 1;
        } else if (box.textContent === "Bpawn ") {
            score -= 1;
            bpawn += 1;
        }
    });

    white_pieces_string = "".concat(
        "&#9817; ".repeat(8-wpawn),
        "&#9815; ".repeat(2-wbishop),
        "&#9816;".repeat(2-wknight),
        "&#9814;".repeat(2-wrook),
        "&#9813;".repeat(1-wqueen)
    );
    black_pieces_string = "".concat(
        "&#9823; ".repeat(8-bpawn),
        "&#9821; ".repeat(2-bbishop),
        "&#9822;".repeat(2-bknight),
        "&#9820;".repeat(2-brook),
        "&#9819;".repeat(1-bqueen)
    );

    if (score > 0) {
        score_white = `+${score} `;
    } else if (score < 0) {
        score_black = `+${Math.abs(score)} `;
    }

    score_white = score_white.concat(black_pieces_string);
    score_black = score_black.concat(white_pieces_string);
    score_screen_w.innerHTML = score_white;
    score_screen_b.innerHTML = score_black;
}

function get_piece_from_move(move){
    let piece = move.slice(0, 2);
    let square = move.slice(2,4);
    return [piece, square]
}

// call everything if loaded
document.addEventListener('DOMContentLoaded', function() {
    insertImage();
    coloring();
    update_score();
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach(box => {
        // check for click on square
        box.addEventListener("click", function() {
            let piece = box.textContent;
            let square = box.id;
            let player = Array.from(piece)[0];
            // show legal moves
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
                    return response.text();
                })
                .then(text => {
                    return JSON.parse(text);
                })
                .then(data => {
                    color_moves(piece, square, data.moves, turn);
                })
            }
            // make move
            else if (document.getElementById(square).style.backgroundColor == 'rgb(223, 168, 0)') {
                piece = search_piece();
                //check for white promotion
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
                //check for black promotion
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
                // normal move
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
                        let san = data["special"];
                        if (document.getElementById(square).textContent === "" && san.includes("x")) {
                            let x = parseInt(square.slice(-1));
                            let y = square.slice(0, 1);
                            if (turn === "W") {
                                x -= 1;
                            } else if (turn === "B") {
                                x += 1;
                            }
                            document.getElementById(y + x.toString()).textContent = "";
                        }
                        document.getElementById(square).textContent = document.getElementById(piece).textContent;
                        document.getElementById(piece).textContent = "";
                        if (san === "O-O" && turn === "W") {
                            document.getElementById("h1").textContent = "";
                            document.getElementById("f1").textContent = "Wrook";
                        } else if (san === "O-O-O" && turn === "W") {
                            document.getElementById("a1").textContent = "";
                            document.getElementById("d1").textContent = "Wrook";
                        } else if (san === "O-O" && turn === "B") {
                            document.getElementById("h8").textContent = "";
                            document.getElementById("f8").textContent = "Brook";
                        } else if (san === "O-O-O" && turn === "B") {
                            document.getElementById("a8").textContent = "";
                            document.getElementById("d8").textContent = "Brook";
                        }
                        insertImage();
                        coloring();
                        document.getElementById(piece).style.backgroundColor = "#d8ce34";
                        document.getElementById(square).style.backgroundColor = "#d8ce34";
                        update_score();
                        if (data["outcome"]) {
                            document.getElementById("result").style.display = "block";
                            document.getElementById("resultText").textContent = data["outcome"];
                            turn_king(turn);
                        }
                        if (turn === "W") {
                            turn = "B";
                        } else {
                            turn = "W";
                        }
                    
                        // Jetzt wird der Zug des Computers angefordert
                        return fetch('', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'X-CSRFToken': csrftoken
                            },
                            body: 'is_computer_request=true'
                        });
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        let san = data["special"];
                        let values = get_piece_from_move(data["move"]);
                        let piece = values[0];
                        let square = values[1];
                        if (document.getElementById(square).textContent === "" && san.includes("x")) {
                            let x = parseInt(square.slice(-1));
                            let y = square.slice(0, 1);
                            if (turn === "W") {
                                x -= 1;
                            } else if (turn === "B") {
                                x += 1;
                            }
                            document.getElementById(y + x.toString()).textContent = "";
                        }
                        document.getElementById(square).textContent = document.getElementById(piece).textContent;
                        document.getElementById(piece).textContent = "";
                        if (san === "O-O" && turn === "W") {
                            document.getElementById("h1").textContent = "";
                            document.getElementById("h1").backgroundColor = "#d8ce34";
                            document.getElementById("f1").textContent = "Wrook";
                        } else if (san === "O-O-O" && turn === "W") {
                            document.getElementById("a1").textContent = "";
                            document.getElementById("a1").backgroundColor = "#d8ce34";
                            document.getElementById("d1").textContent = "Wrook";
                        } else if (san === "O-O" && turn === "B") {
                            document.getElementById("h8").textContent = "";
                            document.getElementById("h8").backgroundColor = "#d8ce34";
                            document.getElementById("f8").textContent = "Brook";
                        } else if (san === "O-O-O" && turn === "B") {
                            document.getElementById("a8").textContent = "";
                            document.getElementById("a8").backgroundColor = "#d8ce34";
                            document.getElementById("d8").textContent = "Brook";
                        }
                        insertImage();
                        coloring();
                        document.getElementById(piece).style.backgroundColor = "#d8ce34";
                        document.getElementById(square).style.backgroundColor = "#d8ce34";
                        update_score();
                        if (data["outcome"]) {
                            document.getElementById("result").style.display = "block";
                            document.getElementById("resultText").textContent = data["outcome"];
                            turn_king(turn);
                        }
                        if (turn === "W") {
                            turn = "B";
                        } else {
                            turn = "W";
                        }
                    });                    
                }              
            }
        });
    });
});