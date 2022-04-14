describe('SignUp Controller', () => { 
  test('should return 400 if no name is provide', () => { 
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        confirmPassword: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
   })
})