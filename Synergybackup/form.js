document.addEventListener("DOMContentLoaded", function () {
    const teamSizes = {
        "Basketball": { min: 6, max: 12, fee: 1000 },
        "Volleyball": { min: 6, max: 12, fee: 1000 },
        "Cricket": { min: 9, max: 14, fee: 1200 },
        "Kho-Kho": { min: 9, max: 12, fee: 1000 },
        "Chess": { min: 1, max: 1, fee: 500 },
        "Athletics": { min: 1, max: 1, fee: 300 }
    };

    function nextStep(step) {
        if (validateForm(step - 1)) {
            document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
            document.getElementById(`step${step}`).classList.add('active');
        }
    }

    function prevStep(step) {
        document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
        document.getElementById(`step${step}`).classList.add('active');
    }

    function validateForm(step) {
        let valid = true;
        const currentStep = document.getElementById(`step${step}`);
        const inputs = currentStep.querySelectorAll("input[required], select[required]");

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add("error");
                valid = false;
            } else {
                input.classList.remove("error");
            }
        });

        if (!valid) {
            alert("Please fill all required fields.");
        }

        return valid;
    }

    function updateTeamSize() {
        const selectedEvent = document.getElementById("eventSelect").value;
        const playerFields = document.getElementById("playerFields");
        const athleticsOptions = document.getElementById("athleticsOptions");
        const registrationFeeDisplay = document.getElementById("registrationFee");

        playerFields.innerHTML = "";

        if (selectedEvent === "Athletics") {
            athleticsOptions.style.display = "block";
        } else {
            athleticsOptions.style.display = "none";
        }

        if (teamSizes[selectedEvent]) {
            const { min, max, fee } = teamSizes[selectedEvent];

            for (let i = 1; i <= max; i++) {
                let input = document.createElement("input");
                input.type = "text";
                input.placeholder = `Player ${i} Name`;
                input.id = `player${i}`;
                input.required = i <= min;
                playerFields.appendChild(input);
            }

            // Display Registration Fee
            registrationFeeDisplay.innerHTML = `Registration Fee: ₹${fee}`;
        }
    }

    function generatePDF() {
        if (!validateForm(3)) return;

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const fullName = document.getElementById("fullName").value;
        const contactNumber = document.getElementById("contactNumber").value;
        const collegeName = document.getElementById("collegeName").value;
        const email = document.getElementById("email").value;
        const eventSelect = document.getElementById("eventSelect").value;
        const teamName = document.getElementById("teamName").value;
        const athleticsEvent = eventSelect === "Athletics" ? document.getElementById("athleticsEvent").value : "";
        const registrationFee = teamSizes[eventSelect].fee;

        doc.text("Sports Event Registration", 20, 20);
        doc.text(`Full Name: ${fullName}`, 20, 30);
        doc.text(`Contact Number: ${contactNumber}`, 20, 40);
        doc.text(`College Name: ${collegeName}`, 20, 50);
        doc.text(`Email: ${email}`, 20, 60);
        doc.text(`Event: ${eventSelect} ${athleticsEvent ? `(${athleticsEvent})` : ""}`, 20, 70);
        doc.text(`Team: ${teamName}`, 20, 80);
        doc.text(`Registration Fee: ₹${registrationFee}`, 20, 90);

        let yOffset = 100;
        const { min, max } = teamSizes[eventSelect];

        for (let i = 1; i <= max; i++) {
            const playerName = document.getElementById(`player${i}`).value;
            if (playerName.trim()) {
                doc.text(`Player ${i}: ${playerName}`, 20, yOffset);
                yOffset += 10;
            }
        }

        doc.save("Registration_Details.pdf");
    }

    function submitForm(event) {
        event.preventDefault(); // Prevent page reload

        if (!validateForm(3)) return; // Ensure all steps are filled

        let formData = new FormData(document.getElementById("registrationForm"));

        fetch("register.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Show response message
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    window.nextStep = nextStep;
    window.prevStep = prevStep;
    window.updateTeamSize = updateTeamSize;
    window.generatePDF = generatePDF;
    window.submitForm = submitForm;
});

