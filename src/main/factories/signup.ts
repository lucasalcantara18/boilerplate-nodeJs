import { DbAddAccount } from '../../data/usecases/addAccount/dbAddAccount'
import { BcryptAdapter } from '../../infra/criptography/bcryptAdapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/accountRepository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/logRepository/log'
import { SignUpController } from '../../presentation/controllers/signup'
import { Controller } from '../../presentation/helpers/controller'
import { EmailValidatorAdapter } from '../../utils/emailValidatorAdapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const logErrorRepository = new LogMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
