import { PostgresError } from "postgres";

// Type guard function to check if an error is a PostgresError
export function isPostgresError(error: any): error is PostgresError {
  return error instanceof Error && "table_name" in error;
}
