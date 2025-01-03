<?php
session_start();
require('db.php');

$stmt = $kapcsolat->prepare("SELECT id FROM users WHERE username = :username AND password = :password");
$stmt->execute([
    "username" => $_POST["username"],
    "password" => $_POST["password"], // Compare plaintext password
]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo "Sikeres bejelentkezés";
    $_SESSION["id"] = $user['id']; // Store user ID in session
    header("Location: index.php");
    exit;
} else {
    echo "<script>
        alert('Hibás felhasználónév vagy jelszó');
        window.location.href = 'login.php';
    </script>";
    exit;
}
?>
