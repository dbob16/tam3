CREATE TABLE `baskets` (
	`prefix` text,
	`b_id` integer,
	`description` text DEFAULT '',
	`donors` text DEFAULT '',
	`winning_ticket` integer DEFAULT 0,
	PRIMARY KEY(`prefix`, `b_id`)
);
--> statement-breakpoint
CREATE TABLE `prefixes` (
	`name` text PRIMARY KEY NOT NULL,
	`color` text,
	`weight` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `tickets` (
	`prefix` text,
	`t_id` integer,
	`first_name` text DEFAULT '',
	`last_name` text DEFAULT '',
	`phone_number` text DEFAULT '',
	`preference` text DEFAULT 'CALL',
	PRIMARY KEY(`prefix`, `t_id`)
);
--> statement-breakpoint
CREATE VIEW `combined` AS SELECT b.prefix, b.b_id, b.winning_ticket, CONCAT(t.last_name, ', ', t.first_name) AS winner
	FROM baskets b LEFT JOIN tickets t
	ON b.prefix = t.prefix AND b.winning_ticket = t.t_id
	ORDER BY b.prefix, b.b_id;--> statement-breakpoint
CREATE VIEW `counts` AS SELECT prefix, COUNT(*) AS total_sold, COUNT(DISTINCT CONCAT(first_name,last_name,phone_number)) AS unique_sold
	FROM tickets
	GROUP BY prefix
	UNION ALL
	SELECT 'Total' AS prefix, COUNT(*) AS total_sold, COUNT(DISTINCT CONCAT(first_name,last_name,phone_number)) AS unique_sold
	FROM tickets;;--> statement-breakpoint
CREATE VIEW `report` AS SELECT b.prefix, CONCAT(t.last_name, ', ', t.first_name) AS winner_name, t.phone_number, 	t.preference, b.b_id, b.winning_ticket, b.description
	FROM baskets b LEFT JOIN tickets t
	ON b.prefix = t.prefix AND b.winning_ticket = t.t_id
	ORDER BY b.prefix, winner_name, t.phone_number, t.preference, b.b_id;