import { AddAccountDto } from '../dto/AddAccountDto'
import { AccountModel } from '../models/account'

export interface AddAccount {
  add (account: AddAccountDto): Promise<AccountModel>
}
