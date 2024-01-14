 function convertTemperature() {
    var temperatureInput = document.getElementById('temperature').value;
    var fromUnit = document.getElementById('fromUnit').value;
    var toUnit = document.getElementById('toUnit').value;

    if (!temperatureInput || isNaN(temperatureInput)) {
        alert("Please enter a valid number for temperature.");
        return;
    }

    var temperature = parseFloat(temperatureInput);
    var result;

    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        result = (temperature * 9/5) + 32;
    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        result = temperature + 273.15;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        result = (temperature - 32) * 5/9;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        result = (temperature - 32) * 5/9 + 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        result = temperature - 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        result = (temperature - 273.15) * 9/5 + 32;
    } else {
        // If units are the same, no conversion needed
        result = temperature;
    }

    displayResult(result, toUnit);
}

function displayResult(result, unit) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = result.toFixed(2) + ' ' + unit.charAt(0).toUpperCase() + unit.slice(1);
} 