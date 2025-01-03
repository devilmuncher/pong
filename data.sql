CREATE TABLE `users` (
   `username` varchar(10) NOT NULL,
   `passcode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `users` (`username`, `passcode`) VALUES
('guest', 'abc123'),
('manager', 'secret'),
('user', 'test');

CREATE TABLE high_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user varchar(15),
    score INT,
    difficulty varchar(15),
    FOREIGN KEY (user) REFERENCES users(user)
);