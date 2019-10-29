class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(someFunction) {
    this.authenticated = true;
    someFunction();
  }

  logout(someFunction) {
    this.authenticated = false;
    someFunction();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
