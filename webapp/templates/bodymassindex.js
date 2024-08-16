<script >
        // script.js
function calculateBMI() {
    // Get input values
    var age = parseInt(document.getElementById('age').value);
    var gender = document.getElementById('gender').value;
    var height = parseFloat(document.getElementById('height').value);
    var weight = parseFloat(document.getElementById('weight').value);
    // Check if inputs are valid
    if (isNaN(age) || isNaN(height) || isNaN(weight) || age <= 0 || height <= 0 || weight <= 0) {
        document.getElementById('result').innerHTML = 'Please enter valid age, height, and weight.';
        return;
    }
    // Calculate BMI
    var bmiResult = weight / (height * height);
    // Display result
    var resultElement = document.getElementById('result');
    resultElement.innerHTML = 'Your BMI is: ' + bmiResult.toFixed(2);
    // Interpret BMI categories
    if (bmiResult < 18.5) {
        resultElement.innerHTML += '<br>Underweight';
    } else if (bmiResult < 24.9) {
        resultElement.innerHTML += '<br>Normal weight';
    } else if (bmiResult < 29.9) {
        resultElement.innerHTML += '<br>Overweight';
    } else {
        resultElement.innerHTML += '<br>Obese';
    }
  //  if(bmiResult!=null){
        setNeedleRotation(bmiResult);
        console.log('@@bmiResult first'+bmiResult);
   // }
}
function setNeedleRotation(bmiResult) {
    console.log('@@bmiResult'+bmiResult);
           // const bmiInput = document.getElementById('bmi');
          //  const bmi1 = parseFloat(bmiResult.value);
const bmi2 = bmiResult.toFixed(2);
            if (!isNaN(bmi2)) {
                const needle = document.getElementById('needle');
                const rotationAngle = calculateRotationAngle(bmi2);
                needle.style.transform = `translate(-50%, -100%) rotate(${rotationAngle}deg)`;
            } else {
                alert('Please enter a valid BMI value.');
            }
        }

        function calculateRotationAngle(bmi2) {
            const bmiRanges = [
                { min: 0, max: 18.4, angle: -90, label: 'Underweight' },
                { min: 18.5, max: 24.9, angle: -35, label: 'Normal' },
                { min: 25, max: 25.9, angle: 0, label: 'Normal' },
                { min: 26, max: 29.9, angle: 45, label: 'Overweight' },
                { min: 30, max: 100, angle: 90, label: 'Obese' },
            ];

            const range = bmiRanges.find(range => bmi2 >= range.min && bmi2 <= range.max);
            updateReadings(range ? range.label : 'Unknown');
            return range ? range.angle : 0;
        }

        function updateReadings(label) {
            const readings = document.querySelector('.readings');
           // readings.innerHTML = `<span>${label}</span>`;
        }
    </script>
