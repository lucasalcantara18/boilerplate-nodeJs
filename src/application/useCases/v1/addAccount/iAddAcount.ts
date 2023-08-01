import { AddAccountModel } from '../../../../domain/dtos/addAccountModel'

export interface IAddAccount {
  handle: (addAccountModel: AddAccountModel) => Promise<boolean>
}
