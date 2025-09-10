import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  dialect: 'singlestore',
  schema: './src/server/db/schema.ts',
  out: "./drizzle",
  tablesFilter: ["drive-tutorial_*"],
  dbCredentials: {
    host: process.env.SINGLESTORE_HOST!,
    port: Number(process.env.SINGLESTORE_PORT ?? 3306),
    user: process.env.SINGLESTORE_USER!,
    password: process.env.SINGLESTORE_PASS!,
    database: process.env.SINGLESTORE_DB_NAME!,
    ssl: {}, // required for SingleStore
  },
} satisfies Config;
