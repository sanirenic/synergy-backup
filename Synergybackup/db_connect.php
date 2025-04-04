<?php
$host = "127.0.0.1";
$username = "root";  
$password = "";      
$dbname = "ignite25_registration";  
$port = 3308;        


$conn = new mysqli($host, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully!";
?>
