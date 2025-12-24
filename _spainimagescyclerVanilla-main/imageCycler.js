window.onload = cycle;

let slidenum = 0;
function cycle() {
    slidenum = slidenum + 1;
    if (slidenum == slides.length) 
    slidenum = 0;
    let slide_image = document.getElementById('slide_image');
    let slide_text = document.getElementById('slide_text');
    let slide_link = document.getElementById('slide_link');
    slide_image.src = slides[slidenum].src;
    slide_text.innerHTML = slides[slidenum].caption;
    slide_link.href = slides[slidenum].url;
    
    if (slides[slidenum].url.length > 0) {
        slide_image.style.cursor = 'pointer';
        slide_image.onclick = function() {
            window.location.href = slides[slidenum].url;
        }
    }
    setTimeout(cycle, 3000);
}