// Function to handle the calculation
const processEntries = () => {
    // Get the input elements
    const milesInput = document.getElementById("miles");
    const gallonsInput = document.getElementById("gallons");
    const resultInput = document.getElementById("mpg_result");

    const miles = parseFloat(milesInput.value);
    const gallons = parseFloat(gallonsInput.value);

    // Logic validation
    if (!isNaN(miles) && !isNaN(gallons) && miles > 0 && gallons > 0) {
        const mpg = (miles / gallons).toFixed(2);
        // Display result in the disabled input field
        resultInput.value = mpg;
    } else {
        alert("Please enter valid numbers greater than zero for both fields.");
    }
};

// Function to clear all fields
const clearEntries = () => {
    document.getElementById("miles").value = "";
    document.getElementById("gallons").value = "";
    document.getElementById("mpg_result").value = "";
    // Move focus back to the first field for better user experience
    document.getElementById("miles").focus();
};

// Attach events when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Standard JS selection instead of the $ shortcut
    document.getElementById("calculate_btn").addEventListener("click", processEntries);
    document.getElementById("clear_btn").addEventListener("click", clearEntries);
});