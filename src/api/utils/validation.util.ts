import * as z from 'zod'
import ApiError from '../api-error';
import {StatusCodes} from 'http-status-codes'

interface ValidationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: z.ZodObject<any, any> | z.ZodUnion<any> | z.ZodIntersection<any, any> | z.ZodAny
  data: unknown
}

function validateSchema({schema, data}: ValidationProps): void {
  try {
    schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorResponse = new ApiError(
        z.prettifyError(error),
        StatusCodes.BAD_REQUEST,
        'Validation Error',
      )
      const fields: Record<string, string> = {}
      error.issues.forEach((issue) => {
        fields[issue.path.join('.')] = issue.message
      })
      errorResponse.fields = fields
      throw errorResponse
    } else {
      throw new ApiError(
        'An unknown error occurred during request validation.',
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Validation Error',
      )
    }
  }
}

export default validateSchema
