export class ValidationError extends Error {
  public message
  public name

  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    this.message = message
  }
}

export class NotFoundError extends Error {
  public message
  public name

  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    this.message = message
  }
}
