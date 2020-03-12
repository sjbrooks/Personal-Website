window.onload = function () {
    
    var resetButton = document.querySelector("#resetButton");
    var gamespace = document.getElementById("gamespace");
    var cards = document.querySelectorAll(".thecard");
    var blockEventDiv = document.querySelector(".blockdiv");

    blockEventDiv.addEventListener("click", function() {
        return false;
    });

    var attemptCount = 0;
    var matchCount = 0;
    
    document.getElementById('best-game').innerText = JSON.parse(localStorage.getItem("best-game"));

    function cardClicked () {
        this.classList.toggle("faceup");
        var cardName = this.getAttribute('name');
        var faceupCards = document.querySelectorAll("div.faceup:not(.matched)");
        if (faceupCards.length === 1) faceupCards[0].removeEventListener("click", cardClicked);
        if (faceupCards.length === 2) {
            if (faceupCards[0].getAttribute('name') === faceupCards[1].getAttribute('name')) {
                faceupCards[0].classList.add("matched");
                faceupCards[1].classList.add("matched");
                faceupCards[0].removeEventListener("click", cardClicked);
                faceupCards[1].removeEventListener("click", cardClicked);
                
                attemptCount++;
                document.getElementById('counter').innerText = attemptCount;
                
                matchCount++;
                if (matchCount === 12) {
                    matchCount = 0;
                    setTimeout(function () {
                        alert("Winner!");
                    }, 500);
                    if (JSON.parse(localStorage.getItem("best-game")) > attemptCount || JSON.parse(localStorage.getItem("best-game"))==null) {
                        localStorage.setItem("best-game", JSON.stringify(attemptCount));
                        document.getElementById('best-game').innerText = JSON.parse(localStorage.getItem("best-game"));    
                    }
                }
            } else {
                blockEventDiv.classList.toggle("on");

                attemptCount++;
                document.getElementById('counter').innerText = attemptCount;

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
        for (let i=0; i<cards.length; i++) {
            var shuffleCardName = "card" + (Math.ceil(Math.random()*24));
            var cardToBeShuffled = document.getElementById(shuffleCardName).parentElement;
            gamespace.appendChild(cardToBeShuffled);
        }
        for (let i=0; i<cards.length; i++) {
            var card = cards[i];
            card.addEventListener("click", cardClicked);
            card.classList.remove("matched");
        }
    };

    shuffle();

    resetButton.addEventListener("click", function(){
        var faceupCards = document.querySelectorAll("div.faceup");
        attemptCount = 0;
        document.getElementById('counter').innerText = attemptCount;
        for (let i=0; i<faceupCards.length; i++) {
            var card = faceupCards[i];
            card.classList.toggle("faceup");
        }
        shuffle();
    });


}