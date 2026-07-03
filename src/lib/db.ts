import { Pool } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const IDENTIFIER_PATTERN = /^[a-z][a-z0-9_]*$/;

export type ApiField = {
  id: string;
  type:
    | "text"
    | "number"
    | "select"
    | "multiselect"
    | "checkbox"
    | "display"
    | "datetime-local"
    | "date"
    | "time"
    | "textarea";
};

export function toSnakeCase(value: string): string {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_")
    .toLowerCase();
}

export function toCamelCase(value: string): string {
  return value.replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase());
}

export function mapRowToCamelCase(row: Record<string, any>): Record<string, any> {
  if (!row) return row;
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(row)) {
    result[toCamelCase(key)] = value;
  }
  return result;
}


export function ensureSafeIdentifier(
  value: string,
  kind: "table" | "column",
): string {
  if (!IDENTIFIER_PATTERN.test(value)) {
    throw new Error(`Invalid ${kind} identifier: ${value}`);
  }

  return value;
}

export function tableNameFromCardTitle(cardTitle: string): string {
  return ensureSafeIdentifier(toSnakeCase(cardTitle), "table");
}

export function columnNameFromFieldId(fieldId: string): string {
  return ensureSafeIdentifier(toSnakeCase(fieldId), "column");
}

export function quoteIdentifier(identifier: string): string {
  return `"${identifier}"`;
}

function getColumnType(fieldType: ApiField["type"]) {
  switch (fieldType) {
    case "number":
      return "NUMERIC";
    case "date":
      return "DATE";
    case "time":
      return "TIME";
    case "datetime-local":
      return "TIMESTAMP";
    case "multiselect":
    case "checkbox":
      return "JSONB";
    default:
      return "TEXT";
  }
}

export async function ensureTable(
  cardTitle: string,
  fields: ApiField[],
) {
  const tableName = tableNameFromCardTitle(cardTitle);
  const quotedTable = quoteIdentifier(tableName);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${quotedTable} (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const existingColumnsResult = await pool.query<{ column_name: string }>(
    `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
    `,
    [tableName],
  );

  const existingColumns = new Set(
    existingColumnsResult.rows.map((row) => row.column_name),
  );

  for (const field of fields) {
    const columnName = columnNameFromFieldId(field.id);

    if (existingColumns.has(columnName)) {
      continue;
    }

    await pool.query(
      `ALTER TABLE ${quotedTable} ADD COLUMN IF NOT EXISTS ${quoteIdentifier(columnName)} ${getColumnType(field.type)}`,
    );
  }

  return tableName;
}
