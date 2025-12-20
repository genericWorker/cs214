window.onload = rotate;
var theAd = 0;
var adImages = new Array("images/superhero1.png",
    "images/superhero2.png",
    "images/superhero3.png",
    "images/superhero4.png",
    "images/superhero5.png",
    "images/superhero5.png"
);

function rotate() {
    theAd++;
    if (theAd == adImages.length) { theAd = 0; }
    document.getElementById("banner").src = adImages[theAd];
    setTimeout(rotate, 3 * 1000);
}