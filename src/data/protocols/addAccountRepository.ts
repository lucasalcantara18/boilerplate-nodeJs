import { AddAccountDto } from '../../domain/dto/AddAccountDto'
import { AccountModel } from '../../domain/models/account'

export interface AddAccountRepository {
  add (accountData: AddAccountDto): Promise<AccountModel>
}
