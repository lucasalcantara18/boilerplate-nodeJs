import { HttpResponse } from '../../domain/interfaces/http/iHttp'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const success = (body?: any): HttpResponse => ({
  statusCode: 200,
  body: body
})