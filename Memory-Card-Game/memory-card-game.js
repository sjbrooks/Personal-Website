window.onload = function () {
    
    let resetButton = document.querySelectorAll(".resetButton");
    let gamespace = document.getElementById("gamespace");
    let cards = document.querySelectorAll(".thecard");
    let blockEventDiv = document.querySelector(".blockdiv");
    let winningReset = document.querySelector('#winning-page-button');
    let winnerMessage = document.querySelector('#winner-message');
    let attemptCounter = document.querySelectorAll('.counter');
    let bestGame = document.getElementsByClassName('best-game');

    blockEventDiv.addEventListener("click", function() {
        return false;
    });

    let attemptCount = 0;
    let matchCount = 0;
    
    bestGame[0].innerText = JSON.parse(localStorage.getItem("best-game"));
    bestGame[1].innerText = JSON.parse(localStorage.getItem("best-game"));

    function cardClicked () {
        this.classList.toggle("faceup");
        let cardName = this.getAttribute('name');
        let faceupCards = document.querySelectorAll("div.faceup:not(.matched)");
        if (faceupCards.length === 1) faceupCards[0].removeEventListener("click", cardClicked);
        if (faceupCards.length === 2) {
            if (faceupCards[0].getAttribute('name') === faceupCards[1].getAttribute('name')) {
                faceupCards[0].classList.add("matched");
                faceupCards[1].classList.add("matched");
                faceupCards[0].removeEventListener("click", cardClicked);
                faceupCards[1].removeEventListener("click", cardClicked);
                
                attemptCount++;
                attemptCounter[0].innerText = attemptCount;
                attemptCounter[1].innerText = attemptCount;
                
                matchCount++;
                if (matchCount === 12) {
                    matchCount = 0;
                    setTimeout(function () {
                        winnerMessage.style.display = 'block';
                        // alert("Winner!");
                    }, 500);
                    if (JSON.parse(localStorage.getItem("best-game")) > attemptCount || JSON.parse(localStorage.getItem("best-game"))==null) {
                        localStorage.setItem("best-game", JSON.stringify(attemptCount));
                        bestGame[0].innerText = JSON.parse(localStorage.getItem("best-game"));
                        bestGame[1].innerText = JSON.parse(localStorage.getItem("best-game"));   
                    }
                }
            } else {
                blockEventDiv.classList.toggle("on");

                attemptCount++;
                attemptCounter[0].innerText = attemptCount;
                attemptCounter[1].innerText = attemptCount;

                setTimeout(function() {
                    faceupCards[0].classList.toggle("faceup");
                    faceupCards[1].classList.toggle("faceup");
                    
                    faceupCards[0].addEventListener("click", cardClicked);
                    faceupCards[1].addEventListener("click", cardClicked);

                    blockEventDiv.classList.toggle("on");
                    }, 1000);

            }
        }
    }

    function shuffle(){
        for (let i=0; i<50; i++) {
            let shuffleCardName = "card" + (Math.ceil(Math.random()*24));
            let cardToBeShuffled = document.getElementById(shuffleCardName).parentElement;
            gamespace.appendChild(cardToBeShuffled);
        }
        for (let i=0; i<cards.length; i++) {
            let card = cards[i];
            card.addEventListener("click", cardClicked);
            card.classList.remove("matched");
        }
    };

    shuffle();

    // resetButton.addEventListener("click", function() {
    //     let faceupCards = document.querySelectorAll("div.faceup");
    //     attemptCount = 0;
    //     document.querySelectorAll('.counter').innerText = attemptCount;
    //     for (let i=0; i<faceupCards.length; i++) {
    //         let card = faceupCards[i];
    //         card.classList.toggle("faceup");
    //     }
    //     shuffle();
    // });

    $('body').on('click', '.resetButton', function() {
        let faceupCards = document.querySelectorAll("div.faceup");
        attemptCount = 0;
        attemptCounter[0].innerText = attemptCount;
        attemptCounter[1].innerText = attemptCount;
        for (let i=0; i<faceupCards.length; i++) {
            let card = faceupCards[i];
            card.classList.toggle("faceup");
        }
        shuffle();
    });

    winningReset.addEventListener("click", function() {
        winnerMessage.style.display = 'none';
    });

}