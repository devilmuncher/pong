<?php
include('session.php'); // Ensure this sets the session correctly
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="pong.css">
    <title>Pong Game</title>
</head>
<body>
    <div id="menu" class="menu">
        <h1>Pong Game</h1>
        <button onclick="startGame('easy')">Easy</button>
        <button onclick="startGame('normal')">Normal</button>
        <button onclick="startGame('hard')">Hard</button>
        <button onclick="showHighScores()">High Scores</button>
        <button id="controls-toggle" onclick="toggleControls()">Controls</button>
        <div id="controls-menu" class="menu-extension">
            <h3>Game Controls</h3>
            <ul>
                <li><strong>W / S</strong> - Move left paddle up/down</li>
                <li><strong>Up Arrow / Down Arrow</strong> - Move right paddle up/down</li>
                <li><strong>P</strong> - Pause/Unpause game</li>
                <li><strong>O</strong> - Open settings</li>
                <li><strong>Escape</strong> - Return to main menu</li>
            </ul>
        </div>
        <form action="logout.php">
            <button type="submit">Logout</button>
        </form>
    </div>
    <canvas id="pong"></canvas>
    <script src="pong.js"></script>
</body>
</html>