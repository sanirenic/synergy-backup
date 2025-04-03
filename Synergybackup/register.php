<?php
$host = "127.0.0.1";
$username = "root";  
$password = "";     
$dbname = "ignite_registration";  
$port = 3308;       

$conn = new mysqli($host, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$college = $_POST['college'];
$college_id = $_POST['college_id'];
$game = $_POST['game'];

// Handle file upload
$target_dir = "uploads/";
$payment_screenshot = $target_dir . basename($_FILES["payment_screenshot"]["name"]);
move_uploaded_file($_FILES["payment_screenshot"]["tmp_name"], $payment_screenshot);

// Insert into database
$sql = "INSERT INTO participants (full_name, contact_number, college_name, email, event, team_name, payment_proof)
        VALUES ('$id', '$contactNumber', '$collegeName', '$email', '$eventSelect', '$teamName', '$paymentProof')";

if ($conn->query($sql) === TRUE) {
    echo "Registration successful!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

