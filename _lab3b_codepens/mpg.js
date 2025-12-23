// Function to handle the calculation
const calculateMPG = (event) => {
    // Prevent the form from actually submitting/refreshing the page
    event.preventDefault();

    // Get values from the input fields
    const miles = parseFloat(document.getElementById("miles").value);
    const gallons = parseFloat(document.getElementById("gallons").value);
    const resultDiv = document.getElementById("result");

    // Logic validation
    if (miles > 0 && gallons > 0) {
        const mpg = (miles / gallons).toFixed(2);
        resultDiv.innerHTML = `<h4>Your MPG is: ${mpg}</h4>`;
    } else {
        resultDiv.innerHTML = `<h3 style="color:red;">Please enter values greater than zero.</h3>`;
    }
};

// Attach the event listener to the form
document.getElementById("mpgForm").addEventListener("submit", calculateMPG);