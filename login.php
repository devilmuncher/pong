<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="pong.css">
    <title>Login</title>
</head>
<body>
<div id="login-form" class="form-container">
    <h2>Login</h2>
    <form action="handle_login.php" method="post">
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" placeholder="Enter your username" required><br>
        
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" placeholder="Enter your password" required><br>
        
        <button type="submit" id="login-button">Login</button>
        <p>Don't have an account? <button type="button" id="switch-to-register" onclick="window.location.href='register.php';">Register</button></p>
    </form>
</div>
</body>
