import { AddAccountRepository } from '../../../../data/protocols/addAccountRepository'
import { AddAccountDto } from '../../../../domain/dto/AddAccountDto'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongoHelper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountDto): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }
}
