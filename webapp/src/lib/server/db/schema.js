import { sqliteTable, sqliteView, integer, text, primaryKey } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const prefixes = sqliteTable('prefixes', {
	name: text('name').primaryKey(),
	color: text('color'),
	weight: integer('weight').default(0)
});

export const tickets = sqliteTable('tickets', {
	prefix: text('prefix'),
	t_id: integer('t_id'),
	first_name: text('first_name'),
	last_name: text('last_name'),
	phone_number: text('phone_number'),
	preference: text('preference')
}, (table) => [
	primaryKey({columns: [table.prefix, table.t_id]})
]);

export const baskets = sqliteTable('baskets', {
	prefix: text('prefix'),
	b_id: integer('b_id'),
	description: text('description'),
	donors: text('donors'),
	winning_ticket: integer('winning_ticket').default(0)
}, (table) => [
	primaryKey({columns: [table.prefix, table.b_id]})
]);

export const combined = sqliteView('combined', {
	prefix: text('prefix'),
	b_id: integer('b_id'),
	winning_ticket: integer('winning_ticket'),
	winner: text('winner')
}).as(
	sql`SELECT b.prefix, b.b_id, b.winning_ticket, CONCAT(t.last_name, ', ', t.first_name) AS winner
	FROM baskets b LEFT JOIN tickets t
	ON b.prefix = t.prefix AND b.winning_ticket = t.t_id
	ORDER BY b.prefix, b.b_id`
);

export const report = sqliteView('report', {
	prefix: text('prefix'),
	winner_name: text('winner_name'),
	phone_number: text('phone_number'),
	preference: text('preference'),
	b_id: integer('b_id'),
	winning_ticket: integer('winning_ticket'),
	description: text('description')
}).as(
	sql`SELECT b.prefix, CONCAT(t.last_name, ', ', t.first_name) AS winner_name, t.phone_number, \
	t.preference, b.b_id, b.winning_ticket, b.description
	FROM baskets b LEFT JOIN tickets t
	ON b.prefix = t.prefix AND b.winning_ticket = t.t_id
	ORDER BY b.prefix, winner_name, t.phone_number, t.preference, b.b_id`
);