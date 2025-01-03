<?php

require('db.php');

// Trim and sanitize inputs
$username = trim($_POST["username"]);
$password = trim($_POST["password"]);

// Check if the username already exists
$stmt = $kapcsolat->prepare("SELECT COUNT(*) FROM users WHERE username = :username");
$stmt->execute(['username' => $username]);
$usernameCount = $stmt->fetchColumn();

if ($usernameCount > 0) {
    echo "
    <script>
        alert('Ez a felhasználónév már foglalt, kérlek válassz másikat.');
        window.location.href = 'register.php';
    </script>";
    exit; // Prevent further script execution
} else {
    // Insert the new user into the database
    $stmt = $kapcsolat->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
    $stmt->execute([
        'username' => $username,
        'password' => $password, // Plaintext password
    ]);

    // Redirect to login after successful registration
    header("Location: login.php");
    exit; // Prevent further script execution
}

?>
