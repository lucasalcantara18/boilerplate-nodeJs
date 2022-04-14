import { MissingParamError } from '../../../../src/domain/exceptions/missingParamException'
import { SignUpController } from '../../../../src/webApi/controllers/signUp/signUp'

describe('SignUp Controller', () => {
  test('should return 400 if no name is provide', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        confirmPassword: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 if no email is provide', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'anyName',
        password: 'anyPassword',
        confirmPassword: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if no password is provide', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('should return 200 if all params is provide', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        confirmPassword: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(undefined)
  })
})
