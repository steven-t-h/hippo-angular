import * as z from 'zod'
import { StatusCodes } from 'http-status-codes'

export const IError = z.object({
  status: z.number().describe('HTTP status code'),
  fields: z
    .record(z.string(), z.string())
    .describe('If available, the fields that caused the error'),
  message: z.string().describe('The error message'),
  name: z.string().describe('A general name for the error'),
})

export type IError = z.infer<typeof IError>

class ApiError extends Error implements IError {
  public status = StatusCodes.INTERNAL_SERVER_ERROR

  public success = false

  public fields: Record<string, string>
  // location of error?

  constructor(msg: string, statusCode: StatusCodes, name = 'Unknown Error', fields?: Record<string, string>) {
    super()
    this.message = msg
    this.status = statusCode
    this.name = name
    this.fields = fields || {}
  }
}

export default ApiError
