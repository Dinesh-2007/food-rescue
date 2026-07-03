"use server";

import { pool, ensureTable, quoteIdentifier, toSnakeCase, mapRowToCamelCase } from "@/lib/db";
import { donationFields } from "@/lib/schema";

export async function createDonation(data: Record<string, any>) {
  const tableName = await ensureTable("donations", donationFields);
  const quotedTable = quoteIdentifier(tableName);
  
  // Extract keys and values to insert
  const keys = Object.keys(data);
  const values = Object.values(data);
  
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
  const quotedKeys = keys.map(k => quoteIdentifier(toSnakeCase(k))).join(", ");
  
  const result = await pool.query(
    `INSERT INTO ${quotedTable} (${quotedKeys}) VALUES (${placeholders}) RETURNING *`,
    values
  );
  
  return mapRowToCamelCase(result.rows[0]);
}

export async function getDonations(filters?: Record<string, any>) {
  const tableName = await ensureTable("donations", donationFields);
  const quotedTable = quoteIdentifier(tableName);
  
  let query = `SELECT * FROM ${quotedTable}`;
  let values: any[] = [];
  
  if (filters && Object.keys(filters).length > 0) {
    const conditions = Object.keys(filters).map((key, index) => {
      values.push(filters[key]);
      return `${quoteIdentifier(toSnakeCase(key))} = $${index + 1}`;
    });
    query += ` WHERE ${conditions.join(" AND ")}`;
  }
  
  query += ` ORDER BY created_at DESC`;
  
  const result = await pool.query(query, values);
  return result.rows.map(mapRowToCamelCase);
}

export async function getDonationById(id: number) {
  const tableName = await ensureTable("donations", donationFields);
  const quotedTable = quoteIdentifier(tableName);
  
  const result = await pool.query(`SELECT * FROM ${quotedTable} WHERE id = $1`, [id]);
  return mapRowToCamelCase(result.rows[0]);
}

export async function updateDonation(id: number, data: Record<string, any>) {
  const tableName = await ensureTable("donations", donationFields);
  const quotedTable = quoteIdentifier(tableName);
  
  const keys = Object.keys(data);
  const values = Object.values(data);
  
  const setString = keys.map((key, i) => `${quoteIdentifier(toSnakeCase(key))} = $${i + 1}`).join(", ");
  values.push(id);
  
  const result = await pool.query(
    `UPDATE ${quotedTable} SET ${setString}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`,
    values
  );
  
  return mapRowToCamelCase(result.rows[0]);
}
