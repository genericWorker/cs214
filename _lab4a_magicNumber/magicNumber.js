// 1. Setup the logic and get input
var guess = prompt("Enter a whole number");
var guessNumber = parseInt(guess);

// Validate input
if (isNaN(guessNumber)) {
    alert("Not a number!");
    window.location.reload();
} else {
    var origNumber = guessNumber;
    let outputHtml = "<ul>";

    // Step 1: Add 9
    let step1 = guessNumber + 9;
    outputHtml += `<li>I added 9 to ${guessNumber}. The new number is ${step1}.</li>`;
    guessNumber = step1;
    
    // Step 2: Multiply by 2
    let step2 = guessNumber * 2;
    outputHtml += `<li>I multiplied ${guessNumber} by 2. The new number is ${step2}.</li>`;
    guessNumber = step2;
    
    // Step 3: Subtract 4
    let step3 = guessNumber - 4;
    outputHtml += `<li>I subtracted 4 from ${guessNumber}. The new number is ${step3}.</li>`;
    guessNumber = step3;
    
    // Step 4: Divide by 2
    let step4 = guessNumber / 2;
    outputHtml += `<li>I divided ${guessNumber} by 2. The new number is ${step4}.</li>`;
    guessNumber = step4;
    
    // Step 5: Subtract original
    outputHtml += `<li>I subtracted your original number of ${origNumber} from ${guessNumber}.</li>`;
    outputHtml += "</ul>";
    
    guessNumber -= origNumber;
    
    // Final Output
    outputHtml += `<br><h3>Your final number is ${guessNumber}</h3>`;

    // Note: Ensure "magicNumber.png" is in your project folder or the image won't show!
    outputHtml += '<img src="magicNumber.png" alt="Magic Number Image"">'; 
    outputHtml += `<h2>Thanks for playing Magic Number.</h2>`;
    outputHtml += `<button onclick="window.location.reload()">Play Again?</button>`;

    // 3. Inject everything into the body at once
    document.body.innerHTML = outputHtml;
}