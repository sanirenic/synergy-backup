<?php
$host = "127.0.0.1";
$username = "root";  // Default XAMPP MySQL username
$password = "";      // Default password is empty
$dbname = "ignite25_registration";  // The database you created
$port = 3308;        // Your MySQL port (from `my.cnf`)

// Create connection
$conn = new mysqli($host, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
