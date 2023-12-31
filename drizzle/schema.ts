import { pgTable, pgEnum, pgSchema, AnyPgColumn, bigint, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const requestStatus = pgEnum("request_status", ['PENDING', 'SUCCESS', 'ERROR'])

import { sql } from "drizzle-orm"

export const products = pgTable("products", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	title: text("title"),
	description: text("description"),
	price: text("price"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const profile = pgTable("profile", {
	id: uuid("id").primaryKey().notNull(),
	role: text("role").default('admin'),
	avatarUrl: text("avatar_url"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	username: text("username"),
	website: text("website"),
	displayName: text("display_name"),
	email: text("email"),
});