import "server-only";

import {
  bigint, text, index, float,
  singlestoreTableCreator
} from "drizzle-orm/singlestore-core";

/**
 * This is the schema file where you define your database tables using Drizzle ORM.
 * 
 * @see https://www.singlestore.com/blog/singlestore-drizzle-integration/ 
 * 
 * for more information
 */

export const createTable = singlestoreTableCreator(
  (name) => `drive-tutorial_${name}`
)

export const files_table = createTable(
  "files_table",
  {
    id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    size: float("size").notNull(),
    fileType: text("fileType").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  }
);

export type DB_FileType = typeof files_table.$inferSelect;

export const folders_table = createTable(
  "folders_table",
  {
    id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  }
);

export type DB_FolderType = typeof folders_table.$inferSelect;