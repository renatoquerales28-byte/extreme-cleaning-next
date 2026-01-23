import { pgTable, serial, text, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    email: text("email"),
    phone: text("phone"),
    serviceType: text("service_type"),
    frequency: text("frequency"),
    totalPrice: integer("total_price"),
    status: text("status").default("new").notNull(), // new, contacted, booked
    details: jsonb("details"), // Store full wizard data object
});

export const promotions = pgTable("promotions", {
    id: serial("id").primaryKey(),
    code: text("code").unique().notNull(),
    discountType: text("discount_type").notNull(), // 'percent' or 'fixed'
    discountValue: integer("discount_value").notNull(),
    active: boolean("active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pricingConfig = pgTable("pricing_config", {
    id: serial("id").primaryKey(),
    key: text("key").unique().notNull(), // e.g., 'base_price_residential'
    value: integer("value").notNull(),
    description: text("description"),
});
