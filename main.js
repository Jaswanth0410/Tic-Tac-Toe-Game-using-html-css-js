let boxes = document.querySelectorAll(".box");
let turn = "X";
let gameOver = false;

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!gameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    document.querySelector(".bg").style.left = turn === "X" ? "0" : "85px";
}

function checkWin() {
    let winCondition = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winCondition.length; i++) {
        let [a, b, c] = winCondition[i];
        let v0 = boxes[a].innerHTML;
        let v1 = boxes[b].innerHTML;
        let v2 = boxes[c].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            gameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins!";
            document.querySelector("#play-again").style.display = "inline";
            boxes[a].style.backgroundColor = "#ff2e";
            boxes[b].style.backgroundColor = "#ff2e";
            boxes[c].style.backgroundColor = "#ff2e";
            boxes[a].style.color = "#000";
            boxes[b].style.color = "#000";
            boxes[c].style.color = "#000";
            return; // Exit the loop once a win is detected
        }
    }
}

function checkDraw() {
    if (!gameOver) {
        let isDraw = Array.from(boxes).every(e => e.innerHTML !== "");
        if (isDraw) {
            gameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

document.querySelector("#play-again").addEventListener("click", () => {
    gameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});
