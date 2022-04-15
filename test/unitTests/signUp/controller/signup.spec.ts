import { InvalidParamError, MissingParamError } from '../../../../src/domain/exceptions/exceptions'
import { IEmailValidator } from '../../../../src/domain/interfaces/validation/iEmailValidator'
import { SignUpController } from '../../../../src/webApi/controllers/signUp/signUp'

interface SutTypes{
  sut: SignUpController
  emailValidatorStub: IEmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements IEmailValidator{
    isValid(email: string): boolean {
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('should return 400 if no name is provide', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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

  test('should return 400 if an email is invalid', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyemail.com.br',
        password: 'anyPassword',
        confirmPassword: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
})
