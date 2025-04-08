// id: serial("id").primaryKey(),
//       firstName: text("first_name").notNull(),
//       lastName: text("last_name").notNull(),
//       city: text("city").notNull(),
//       degree: text("degree").notNull(),
//       specialties: jsonb("payload").default([]).notNull(),
//       yearsOfExperience: integer("years_of_experience").notNull(),
//       phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
//       createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),

export type Advocate = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: string;
};
