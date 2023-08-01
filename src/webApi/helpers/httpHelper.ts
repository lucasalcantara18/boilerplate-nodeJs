import { ServerError } from '../../domain/exceptions/exceptions'
import { HttpResponse } from '../interfaces/http/iHttp'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const success = (body?: any): HttpResponse => ({
  statusCode: 200,
  body: body
})

export const serverError = (error?: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error)
})
