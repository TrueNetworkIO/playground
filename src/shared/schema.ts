import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const snippets = pgTable("snippets", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  code: text("code").notNull(),
  language: text("language").notNull().default("typescript"),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isPublic: boolean("is_public").default(false).notNull(),
  shareId: text("share_id").unique(),
});

export const attestations = pgTable("attestations", {
  id: serial("id").primaryKey(),
  issuer: text("issuer").notNull(),
  subject: text("subject").notNull(),
  property: text("property").notNull(),
  value: jsonb("value").notNull(),
  expirationTime: integer("expiration_time"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: integer("user_id").references(() => users.id),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSnippetSchema = createInsertSchema(snippets).pick({
  title: true,
  code: true,
  language: true,
  isPublic: true,
});

export const insertAttestationSchema = createInsertSchema(attestations).pick({
  issuer: true,
  subject: true,
  property: true,
  value: true,
  expirationTime: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSnippet = z.infer<typeof insertSnippetSchema>;
export type Snippet = typeof snippets.$inferSelect;

export type InsertAttestation = z.infer<typeof insertAttestationSchema>;
export type Attestation = typeof attestations.$inferSelect;

export type CodeLanguage = "typescript" | "assemblyscript";
export type NetworkType = "testnet" | "mainnet";

export type CodeTemplateCategory = "attestations" | "reputation" | "utility";

export type CodeTemplate = {
  id: string;
  title: string;
  description: string;
  category: CodeTemplateCategory;
  language: CodeLanguage;
  code: string;
};

export type ExecutionResult = {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: number;
  executionTime: number;
};
