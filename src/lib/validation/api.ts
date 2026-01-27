import { NextResponse } from 'next/server';
import { z, ZodSchema } from 'zod';

/**
 * Validation error response type
 */
export interface ValidationError {
  success: false;
  error: string;
  details?: z.ZodIssue[];
}

/**
 * Validates request body against a Zod schema
 * Returns parsed data or a NextResponse with validation errors
 */
export async function validateBody<T extends ZodSchema>(
  request: Request,
  schema: T
): Promise<z.infer<T> | NextResponse<ValidationError>> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: result.error.issues,
        },
        { status: 400 }
      );
    }

    return result.data;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid JSON body',
      },
      { status: 400 }
    );
  }
}

/**
 * Validates URL search params against a Zod schema
 * Returns parsed data or a NextResponse with validation errors
 */
export function validateParams<T extends ZodSchema>(
  searchParams: URLSearchParams,
  schema: T
): z.infer<T> | NextResponse<ValidationError> {
  const params = Object.fromEntries(searchParams.entries());
  const result = schema.safeParse(params);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid query parameters',
        details: result.error.issues,
      },
      { status: 400 }
    );
  }

  return result.data;
}

/**
 * Type guard to check if the result is a NextResponse (error)
 */
export function isValidationError<T>(
  result: T | NextResponse<ValidationError>
): result is NextResponse<ValidationError> {
  return result instanceof NextResponse;
}

/**
 * Simple validation function that returns result with errors
 */
export function validate<T extends ZodSchema>(
  data: unknown,
  schema: T
):
  | { success: true; data: z.infer<T> }
  | { success: false; errors: z.ZodIssue[] } {
  const result = schema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: result.error.issues };
  }

  return { success: true, data: result.data };
}
