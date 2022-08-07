import { IAddAccount } from '../../../../src/application/useCases/v1/addAccount/iAddAcount'
import { InvalidParamError, MissingParamError, ServerError } from '../../../../src/domain/exceptions/exceptions'
import { AddAccountModel } from '../../../../src/domain/dtos/addAccountModel'
import { IEmailValidator } from '../../../../src/domain/interfaces/validation/iEmailValidator'
import { SignUpController } from '../../../../src/webApi/controllers/signUp/signUp'

interface SutTypes{
  sut: SignUpController
  emailValidatorStub: IEmailValidator,
  AddAccountStub: IAddAccount,
}

const makeAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount{
    handle (addAccountModel: AddAccountModel): boolean {
      return true;
    }
  }

  return new AddAccountStub()
}

const makeEmailValidator = (type: boolean): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator{
    isValid(email: string): boolean {
      if(type)
        return true
      else
        throw new Error()
    }
  }

  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator(true)
  const AddAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, AddAccountStub)

  return {
    sut,
    emailValidatorStub,
    AddAccountStub
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

  test('should return 400 if no password diferent from confirmPassword', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: '123',
        confirmPassword: '124'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('password'))
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

  test('should call EmailValidator woth correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyemail@gmail.com',
        password: 'anyPassword',
        confirmPassword: 'anyPassword'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('anyemail@gmail.com')
  })

  test('should return 500 if EmailValidator Throws', () => {
    const emailValidatorStub = makeEmailValidator(false)
    const { AddAccountStub } = makeSut()
    const sut = new SignUpController(emailValidatorStub, AddAccountStub)

    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyemail.com.br',
        password: 'anyPassword',
        confirmPassword: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should call AddAccount with correct values', () => {
    const { sut, AddAccountStub } = makeSut()
    const addSpy = jest.spyOn(AddAccountStub, 'handle')
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        confirmPassword: 'anyPassword'
      }
    }
    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'anyName',
      email: 'anyEmail@email.com',
      password: 'anyPassword'
    })
  })
})
