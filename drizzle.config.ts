import { type Config } from "drizzle-kit";

export default {
  dialect: 'singlestore',
  schema: './src/server/db/schema.ts',
  tablesFilter: ["drive_tutorial_*"],
  dbCredentials: {
    host: process.env.SINGLESTORE_HOST!,
    user: process.env.SINGLESTORE_USER!,
    password: process.env.SINGLESTORE_PASS!,
    port: Number(process.env.SINGLESTORE_PORT ?? 3306),
    database: process.env.SINGLESTORE_DB_NAME!,
    ssl: {},
  },
} satisfies Config;
