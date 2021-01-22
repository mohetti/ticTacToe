"use strict"

// this function stores the chosen players (condition: player1, player2, computer). The start-game is in another module
let menupage = (function() {
    let playerSelection = document.querySelectorAll(".player-selection");
    let modalContainer = document.querySelector(".modal-bg");
    let submitName = document.querySelector("#submit");
    let btnColorPlayerTwo = document.querySelector("#player-two");
    let btnColorComputer = document.querySelector("#computer");
    let btnColorplayerOne = document.querySelector("#player-one");
    let modalClose = document.querySelector(".modal-close");
    let inputField = document.querySelector("#name");
    let isplayerOne;

    let gameModeData = {
        playerOne : "",
        playerTwo : "",
        computer : false,
    }


    function closeModal() {
        inputField.value = "";
        modalContainer.classList.remove("bg-active");
    }
    function submitPlayer() {
        if (isplayerOne === true) {
            if (inputField.value === "") {
                alert("Please enter your battle-tag");
            } else if (inputField.value !== "") {
            btnColorplayerOne.style.backgroundColor = "#4CAF50";
            gameModeData.playerOne = inputField.value;
            inputField.value = "";
            modalContainer.classList.remove("bg-active");
            }
        } 
        if (isplayerOne === false) {
            if (inputField.value === "") {
                alert("Please enter your battle-tag");
            } else if (inputField.value !== "") {
                gameModeData.playerTwo = inputField.value;
                btnColorPlayerTwo.style.backgroundColor = "#f44336";
                gameModeData.computer = false;
                btnColorComputer.style.backgroundColor = "#e7e7e7";
                inputField.value = "";
                modalContainer.classList.remove("bg-active");
            }
        }
        
    }
    
    function definePlayer(id, color) {
        modalClose.addEventListener("click", closeModal);


        if (id === "player-one") {
            if (color.backgroundColor === "" || color.backgroundColor === "rgb(231, 231, 231)") {
                isplayerOne = true;
                modalContainer.classList.add("bg-active");
                submitName.addEventListener("click", submitPlayer);
            } else if (color.backgroundColor === "rgb(76, 175, 80)") {
                color.backgroundColor = "#e7e7e7";
                gameModeData.playerOne = "";
            }
        } 
        
        if (id === "player-two") {
            if (color.backgroundColor === "" || color.backgroundColor === "rgb(231, 231, 231)") {
                isplayerOne = false;
                modalContainer.classList.add("bg-active");
                submitName.addEventListener("click", submitPlayer);
            } 
        }
        
    }

    function defineOponent(target) {
        if (target.backgroundColor === "rgb(0, 140, 186)") {
            return;
        } else if (target.backgroundColor === "rgb(231, 231, 231)" || target.backgroundColor === "") {
            target.backgroundColor = "#008CBA";
            btnColorPlayerTwo.style.backgroundColor = "#e7e7e7";
            gameModeData.playerTwo = "";
            gameModeData.computer = true;
        }
    }

    let setupPlayers = function setupPlayers() {
        if (this.id === "player-one" || this.id === "player-two") {
            definePlayer(this.id, this.style);
        } else if (this.id === "computer") {
            defineOponent(this.style);
        }
    }

    playerSelection.forEach(button => button.addEventListener("click", setupPlayers))

    return gameModeData;

}())

let startRound = (function startRound() {
    let startGameBtn = document.querySelector("#start-game");
    let startScreen = document.querySelector(".start-screen");
    let gameboard = document.querySelector(".gameboard");
    let selectionMenu = document.querySelector(".window-container");
    let frame = document.querySelector(".frame");
    let scoreboardPlayer = document.querySelector(".scoreboard-left");
    let scoreboardOponent = document.querySelector(".scoreboard-right");
    let scorePlayer = document.querySelector(".scoreboard-player");
    let scoreOponent = document.querySelector(".scoreboard-oponent");
    let gameBtns = document.querySelector(".game-buttons");
    let backToMenu = document.querySelector("#to-menu");

    function displayScore() {
        scorePlayer.innerText = menupage.playerOne;

        menupage.computer === false ? scoreOponent.innerText = menupage.playerTwo : scoreOponent.innerText = "Computer";
    }

    function startGame() {
        if (menupage.playerOne === "") {
            alert("Please choose your profile.");
        } else if (menupage.playerTwo === "" && menupage.computer === false) {
            alert("Please choose an opponent.")
        } else {
            startScreen.style.display = "none";
            gameboard.style.display = "grid";
            scoreboardPlayer.style.display = "grid";
            scoreboardOponent.style.display = "grid";
            startGameBtn.style.display = "none";
            frame.style.height = "100px";     
            gameBtns.style.display = "flex";    
            selectionMenu.style.gridTemplateAreas = '"header header header" "scoreboard-left gameboard scoreboard-right" "frame frame frame"';
            displayScore();
            game();
        }
    }

    startGameBtn.addEventListener("click", startGame);

    function resetToMenu() {
        location.reload();    
    }

    backToMenu.addEventListener("click", resetToMenu);

}())

/* ***************************** GAME VS COMPUTER FUNCTION STARTS HERE ************************* */
let vsComputerGame = (function vsComputerGame() {
    let cellReset = document.querySelectorAll(".cell");
    let player = {
        person : [],
        computer : [],
    }

    let gameData = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    let pWon = document.querySelector(".player-win");
    let pLose = document.querySelector(".player-loss");
    let pTie = document.querySelector(".player-tie");
    let oWon = document.querySelector(".oponent-win");
    let oLose = document.querySelector(".oponent-loss");
    let oTie = document.querySelector(".oponent-tie");

    function resetField() {
        cellReset.forEach(cellField => cellField.innerText = "");
        player.computer = [];
        player.person = [];
        gameData = [0,1,2,3,4,5,6,7,8];
    }
    

    let isWinner = function isWinner(PLAYER) {
        let check = PLAYER.join();

        let condition = {
            1 : ["0","1","2"],
            2 : ["3","4","5"],
            3 : ["6","7","8"],
            4 : ["0","4","8"],
            5 : ["2","4","6"],
            6 : ["0","3","6"],
            7 : ["1","4","7"],
            9 : ["2","5","8"]
        }
        for (const property in condition) {
            if (condition[property].every(v => check.includes(v)) === true) {
                return ({win : true});
            }
        }
        return ({win : false });
    };

    let checkWinner = function checkWinner(PLAYER1, PLAYER2) {
        let checkP = PLAYER1.join();
        let checkC = PLAYER2.join();

       

        let condition = {
            1 : ["0","1","2"],
            2 : ["3","4","5"],
            3 : ["6","7","8"],
            4 : ["0","4","8"],
            5 : ["2","4","6"],
            6 : ["0","3","6"],
            7 : ["1","4","7"],
            9 : ["2","5","8"]
        }
        for (const property in condition) {
            if (condition[property].every(v => checkP.includes(v)) === true) {
                resetField();
                pWon.innerText = Number(pWon.innerText) + 1;
                oLose.innerText = Number(oLose.innerText) +1;
                return alert("You won");
            }
            if (condition[property].every(v => checkC.includes(v)) === true) {
                oWon.innerText = Number(oWon.innerText) + 1;
                pLose.innerText = Number(pLose.innerText) +1;
                resetField();
                return alert("You lost");
            }
            if (emptySpaces(gameData).length === 0 && isWinner(player.computer).win === false && isWinner(player.person).win === false) {
                pTie.innerText = Number(pTie.innerText) + 1;
                oTie.innerText = Number(oTie.innerText) +1;
                resetField();
                return alert("You tied");
            }
        }
    }

    let isTie = function isTie() {
        if (emptySpaces(gameData).length === 0 && isWinner(player.computer).win === false && isWinner(player.person).win === false) {
            return ({tie: true});
        } else {
            return ({tie : false});
        }
    }

    function emptySpaces(gameData) {
        let updatedBoard = [];
        for (let i = 0; i < gameData.length; i++) {
            if (gameData[i] !== "X") {
                if (gameData[i] !== "O") {
                    updatedBoard.push(gameData[i]);
                }
            }
        }
        return updatedBoard;
    }

    function bestMove() {
        let bestScore = -10000;
        let move;

        for (let i = 0; i < 9; i++) {
            if (gameData[i] !== "X" && gameData[i] !== "O") {
                let comp = player.computer.map(x => x);
                gameData[i] = "O";
                player.computer.push(i);
                let score = minimax(gameData, player.person);

                gameData[i] = i;
                player.computer = comp;
                if (score > bestScore) {
                    bestScore = score;
                    move = gameData[i];
                }
            }
        }

        let place = document.getElementsByName(move);
        place[0].innerText = "O";
        gameData[move] = "O";
        player.computer.push(move);

        function minimax(gameData, maximizer) {
            
            if (isWinner(player.person).win === true) {
                return -10;
            } else if (isWinner(player.computer).win === true) {
                return 10;
            } else if (isTie().tie === true) {
                return 0;
            }
            
            if (maximizer === player.person) {
                let bestScore = 10000;
                for (let i = 0; i < 9; i++) {
                    if (gameData[i] !== "X" && gameData[i] !== "O") {
                        let play = player.person.map(x => x);
                        gameData[i] = "X";
                        player.person.push(i);
                        let score = minimax(gameData, player.computer);
                        gameData[i] = i;
                        player.person = play;
                        if (score < bestScore) {
                            bestScore = score;
                        }
                    }

                }
                return bestScore;

            }
            else if (maximizer === player.computer) {
                let bestScore = -10000;
                for (let i = 0; i < 9; i++) {
                    if (gameData[i] !== "X" && gameData[i] !== "O") {
                        let comp = player.computer.map(x => x);
                        gameData[i] = "O";
                        player.computer.push(i);
                        let score = minimax(gameData, player.person);
                        gameData[i] = i;
                        player.computer = comp;
                        if (score > bestScore) {
                        bestScore = score;
                    }
                }
            }
            return bestScore;
            }
        }
    }


    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.addEventListener("click", personMove));

    function personMove() {

        if (this.innerText === "X" || this.innerText === "O") {
            return;
        } else {
        let playersChoice = this.getAttribute("data-parent");
        player.person.push(this.getAttribute("data-parent"));
        this.innerText = "X";
        gameData[playersChoice] = "X";

        checkWinner(player.person, player.computer);
        bestMove();
        checkWinner(player.person, player.computer);
        player.computer = [];
        player.person = [];
        for (let i = 0; i < 9; i++) {
            if (gameData[i] === "X") {
                player.person.push(i);
            } else if (gameData[i] === "O") {
                player.computer.push(i);
            }
        }
        
    }

    }

    let resetBtn = document.querySelector("#reset");
        function resetPage() {
        cells.forEach(button => button.innerText = "");
        player.person = [];
        player.computer = [];
        gameData = [0,1,2,3,4,5,6,7,8];
        resetField();
        pWon.innerText = "0";
        oWon.innerText = "0";
        pLose.innerText = "0";
        oLose.innerText = "0";
        oTie.innerText = "0";
        pTie.innerText = "0";

    }
    resetBtn.addEventListener("click", resetPage);

})

/* ***************************** GAME VS COMPUTER FUNCTION ENDS HERE ************************* */


let vsPersonGame = (function vsPersonGame() {
    let pWon = document.querySelector(".player-win");
    let pLose = document.querySelector(".player-loss");
    let pTie = document.querySelector(".player-tie");
    let oWon = document.querySelector(".oponent-win");
    let oLose = document.querySelector(".oponent-loss");
    let oTie = document.querySelector(".oponent-tie");

    let i = 1;
    let player = [];
    let oponent = [];
    let buttons = document.querySelectorAll(".cell");
    buttons.forEach(button => button.addEventListener("click", selection));

    

    function selection() {

    let resetBtn = document.querySelector("#reset");
    function resetPage() {
        buttons.forEach(button => button.innerText = "");
        player = [];
        oponent = [];
        i = 1;
        pWon.innerText = "0";
        pLose.innerText = "0";
        pTie.innerText = "0";
        oWon.innerText = "0";
        oLose.innerText = "0";
        oTie.innerText = "0";

    }
    resetBtn.addEventListener("click", resetPage);
        
        let newLocal = this
        storeSelection(newLocal);
        checkWinner();
    }
    function storeSelection(input) {

        if (i >= 10 || input.innerText !== "") {
            return;
        } else if (i % 2 === 0) {
            return input.innerText = "O", oponent.push(input.dataset.parent),
            i++;
        } else if (i % 2 !== 0) {
            return input.innerText = "X", player.push(input.dataset.parent),
            i++;
        }
    
    }

    function resetFields() {
        let btnCells = document.querySelectorAll(".cell");
        btnCells.forEach(cell => cell.innerText = "");
        player = [];
        oponent = [];
        i = 1;
    }

    function checkWinner() {
        let condition = {
            1 : ["0","1","2"],
            2 : ["3","4","5"],
            3 : ["6","7","8"],
            4 : ["0","4","8"],
            5 : ["2","4","6"],
            6 : ["0","3","6"],
            7 : ["1","4","7"],
            9 : ["2","5","8"]
        }
    
        for (const property in condition) {
            let toStringplayer = player.join();
            let toStringoponent = oponent.join();
            if (condition[property].every(v => toStringplayer.includes(v)) === true) {
                pWon.innerText = Number(pWon.innerText) + 1;
                oLose.innerText = Number(oLose.innerText) +1;
                resetFields();
                return alert(menupage.playerOne + " won");
            } else if (condition[property].every(v => toStringoponent.includes(v)) === true) {
                oWon.innerText = Number(oWon.innerText) + 1;
                pLose.innerText = Number(pLose.innerText) +1;
                resetFields();
                return alert(menupage.playerTwo + " won");
            } else if (i === 10) {
                if (condition[property].every(v => toStringplayer.includes(v)) === true) {
                    pWon.innerText = Number(pWon.innerText) + 1;
                    oLose.innerText = Number(oLose.innerText) +1;
                    resetFields();
                    return alert(menupage.playerOne + " won");
                } else if (condition[property].every(v => toStringoponent.includes(v)) === true) {
                    oWon.innerText = Number(oWon.innerText) + 1;
                    pLose.innerText = Number(pLose.innerText) +1;
                    resetFields();
                    return alert(menupage.playerTwo + " won");
                } else {
                    resetFields();
                    oTie.innerText = Number(oTie.innerText) + 1;
                    pTie.innerText = Number(pTie.innerText) +1;
                return alert("You tied");
                }
            }
        }
    }
})

let game = (function() {
    if (menupage.computer === true) {
        vsComputerGame();
    } else {
        vsPersonGame();
        }
});