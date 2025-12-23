var miles = parseFloat(prompt("Enter miles driven"));
var gallons = parseFloat(prompt("Enter gallons of gas used"));

if (!isNaN(miles) && miles > 0 && !isNaN(gallons) && gallons > 0) { 
    let mpg = (miles / gallons).toFixed(2);
    // Using innerHTML to add some styling at the same time
    document.getElementById("result").innerHTML = `<h3>Your MPG is: ${mpg}</h3>`; 
} else {
    alert("One or both entries are invalid");
    document.getElementById("result").textContent = "Invalid input. Please refresh.";
}