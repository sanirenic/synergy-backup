<?php
$host = "127.0.0.1";
$username = "root";  
$password = "";     
$dbname = "ignite25_registration";  
$port = 3308;       

$conn = new mysqli($host, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$contactNumber = $_POST['contact_number'];
$collegeName = $_POST['college'];
$email = $_POST['email'];
$eventSelect = $_POST['game'];
$teamName = $_POST['team_name'];

// Handle file upload
$target_dir = "uploads/";
$paymentProof = $target_dir . basename($_FILES["payment_screenshot"]["name"]);

if (move_uploaded_file($_FILES["payment_screenshot"]["tmp_name"], $paymentProof)) {
    
    // Correct table name and column names
    $sql = "INSERT INTO ignite25_registrations (fullName, contactNumber, collegeName, email, eventSelect, teamName, paymentProof)
            VALUES ('$name', '$contactNumber', '$collegeName', '$email', '$eventSelect', '$teamName', '$paymentProof')";

    if ($conn->query($sql) === TRUE) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

} else {
    echo "Error uploading file.";
}

$conn->close();
?>

