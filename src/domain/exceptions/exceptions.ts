export class MissingParamError extends Error {
  constructor(paramName: string){
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
};

export class InvalidParamError extends Error {
  constructor(paramName: string){
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
};

export class ServerError extends Error {
  constructor(error?: Error){
    super((error !== undefined ? error.message : 'Internal Server error'))
    this.name = 'ServerError'
  }
};
