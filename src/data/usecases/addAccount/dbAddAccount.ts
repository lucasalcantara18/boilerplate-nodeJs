import { AddAccount } from '../../../domain/usecases/addAccount'
import { AccountModel } from '../../../domain/models/account'
import { Encrypter } from '../../protocols/encrypter'
import { AddAccountDto } from '../../../domain/dto/AddAccountDto'
import { AddAccountRepository } from '../../protocols/addAccountRepository'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountDto): Promise<AccountModel> {
    const hashPassword = await this.encrypter.encrypt(account.password)
    const newAccount = await this.addAccountRepository.add(Object.assign({}, account, { password: hashPassword }))
    return newAccount
  }
}
