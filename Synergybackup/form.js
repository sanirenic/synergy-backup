document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents default form submission

        // Form Validation
        if (!validateForm()) {
            return;
        }

        alert("Registration Successful!");
        form.reset(); // Reset form after submission
    });

    function validateForm() {
        let isValid = true;
        const requiredFields = ["name", "contact", "college", "email", "teamName", "event", "college_id", "payment_screenshot"];
        
        requiredFields.forEach((fieldName) => {
            const field = document.getElementsByName(fieldName)[0];
            if (!field || !field.value.trim()) {
                alert(`Please fill the ${fieldName.replace("_", " ")} field.`);
                isValid = false;
            }
        });

        return isValid;
    }
});

// Generate PDF Function
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let content = "Registration Details\n\n";
    const form = document.getElementById("registrationForm");

    for (let element of form.elements) {
        if (element.type !== "submit" && element.type !== "button" && element.type !== "file") {
            content += `${element.placeholder || element.name}: ${element.value}\n`;
        }
    }

    doc.text(content, 10, 10);
    doc.save("Registration.pdf");
}