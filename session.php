<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['id'])) { // Assuming 'id' is the session variable you set during login
    header("Location: login.php");
    exit; // Prevent further script execution
}

// Optional: Fetch additional details if needed
$login_session = $_SESSION['id']; // Store the user ID or fetch user details using the ID

// Example (fetch username or other data from the database):
/*
require('db.php');
$stmt = $kapcsolat->prepare("SELECT username FROM users WHERE id = :id");
$stmt->execute(['id' => $login_session]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
$username = $user['username'];
*/
?>
