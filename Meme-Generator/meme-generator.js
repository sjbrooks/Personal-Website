window.onload = function () {

    var memeForm = document.querySelector("#meme-form");
    var memeGallery = document.querySelector("#meme-gallery");
    // var storedMemes = JSON.parse(localStorage.getItem("storedMemes")) || [];

    // for (let i=0; i<storedMemes.length; i++) {
    //     memeGallery.innerHTML += storedMemes[i][0];
    // }

    memeForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        var img = document.getElementById('img').files[0];
        img.src = URL.createObjectURL(img);
        var topText = document.getElementById("top-text").value;
        var bottomText = document.getElementById("bottom-text").value;

        var meme = document.createElement("div");

        var memepic = document.createElement("img");
        memepic.src = img.src;
        meme.appendChild(memepic);

        var memeText1 = document.createElement("h1");
        memeText1.id = 'top-text-meme';
        memeText1.innerText = topText;
        meme.appendChild(memeText1);

        var memeText2 = document.createElement("h1");
        memeText2.id = 'bottom-text-meme';
        memeText2.innerText = topText;
        meme.appendChild(memeText2);

        var removeText = document.createElement("h1");
        removeText.classList.add("removeText");
        removeText.innerText = "X";
        meme.appendChild(removeText);

        memeGallery.appendChild(meme);

        // storedMemes.push(meme);
        // console.log(storedMemes[0]);
        // localStorage.setItem("storedMemes", JSON.stringify(storedMemes));
    
        memeForm.reset();
    });

    memeGallery.addEventListener("click", function (event){
        if (event.target.innerText === "X") {
            var deletedMeme = event.target.parentNode;
            deletedMeme.remove();
            event.target.remove();
        }
    });

}