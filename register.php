<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="pong.css">
    <title>Pong Game</title>
</head>

<body>
    <div id="register-form" class="form-container">
        <h2>Register</h2>
        <form method="POST" action="handle_register.php">
    <input type="text" name="username" placeholder="Username">
    <input type="password" name="password" placeholder="Password">
    <input type="password" name="confirm_password" placeholder="Confirm Password">
    <button type="submit">Register</button>
</form>
    </div>
</body>

