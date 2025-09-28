CREATE TABLE IF NOT EXISTS api_keys (
    `api_key` VARCHAR(255),
    `pc_name` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS prefixes (
    `name` VARCHAR(255) PRIMARY KEY,
    `color` VARCHAR(255),
    `weight` INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tickets (
    `prefix` VARCHAR(255),
    `t_id` INT,
    `first_name` VARCHAR(255) DEFAULT "",
    `last_name` VARCHAR(255) DEFAULT "",
    `phone_number` VARCHAR(255) DEFAULT "",
    `preference` VARCHAR(20) DEFAULT "CALL",
    PRIMARY KEY (`prefix`, `t_id`)
);

CREATE TABLE IF NOT EXISTS baskets (
    `prefix` VARCHAR(255),
    `b_id` INT,
    `description` VARCHAR(255) DEFAULT "",
    `donors` VARCHAR(255) DEFAULT "",
    `winning_ticket` INT DEFAULT 0,
    PRIMARY KEY (`prefix`, `b_id`)
);

CREATE VIEW IF NOT EXISTS combined AS
SELECT b.prefix, b.b_id, b.winning_ticket, CONCAT(t.last_name, ", ", t.first_name) AS winner
FROM baskets b LEFT JOIN tickets t
ON b.prefix = t.prefix AND b.winning_ticket = t.t_id
ORDER BY b.prefix, b.b_id;

CREATE VIEW IF NOT EXISTS report AS
SELECT b.prefix, CONCAT(t.last_name, ", ", t.first_name) AS winner_name, t.phone_number, t.preference, b.b_id, b.winning_ticket, b.description
FROM baskets b LEFT JOIN tickets t
ON b.prefix = t.prefix AND b.winning_ticket = t.t_id
ORDER BY b.prefix, winner_name, t.phone_number, t.preference, b.b_id;

CREATE VIEW IF NOT EXISTS counts AS
SELECT prefix, COUNT(*) AS total_sold, COUNT(DISTINCT CONCAT(first_name,last_name,phone_number)) AS unique_sold
FROM tickets
GROUP BY prefix
UNION ALL
SELECT 'Total' AS prefix, COUNT(*) AS total_sold, COUNT(DISTINCT CONCAT(first_name,last_name,phone_number)) AS unique_sold
FROM tickets;