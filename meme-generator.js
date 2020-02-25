window.onload = function () {

    var memeForm = document.querySelector("#meme-form");
    var memeGallery = document.querySelector("#meme-gallery");

    memeForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        var img = document.getElementById('img').files[0];
        img.src = URL.createObjectURL(img);
        var topText = document.getElementById("top-text").value;
        var bottomText = document.getElementById("bottom-text").value;

        var meme = document.createElement("div");
        meme.innerHTML += "<img src='" + img.src + "'>";
        meme.innerHTML += "<h1 id='top-text-meme'>" + topText + "<h1>";
        meme.innerHTML += "<h1 id='bottom-text-meme'>" + bottomText + "<h1>";
        meme.innerHTML += "<h1 class='removeText'>X</h1>";

        memeGallery.appendChild(meme);
    
        memeForm.reset();
    });

    memeGallery.addEventListener("click", function (event){
        if (event.target.innerText === "X") {
            event.target.parentNode.remove();
            event.target.remove();
        }
    });

}