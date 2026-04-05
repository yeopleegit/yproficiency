import { getDb, saveDb } from './connection.js';

/** Run a query that returns multiple rows */
export function queryAll(sql: string, params: any[] = []): any[] {
  const db = getDb();
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows: any[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

/** Run a query that returns a single row or null */
export function queryOne(sql: string, params: any[] = []): any | null {
  const db = getDb();
  const stmt = db.prepare(sql);
  stmt.bind(params);
  let row = null;
  if (stmt.step()) {
    row = stmt.getAsObject();
  }
  stmt.free();
  return row;
}

/** Run an INSERT/UPDATE/DELETE and save to disk */
export function execute(sql: string, params: any[] = []): void {
  const db = getDb();
  db.run(sql, params);
  saveDb();
}

/** Run an INSERT and return the last inserted row id, then save */
export function insert(sql: string, params: any[] = []): number {
  const db = getDb();
  db.run(sql, params);
  const result = db.exec('SELECT last_insert_rowid() as id');
  saveDb();
  return result[0].values[0][0] as number;
}
