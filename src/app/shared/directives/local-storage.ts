export class LocalStorage {
  public getUser() {
    return JSON.parse(localStorage.getItem('devio.user'));
  }

  public saveLocalUserData(response: any) {
    this.saveUserToken(response.accessToken);
    this.saveUser(response.userToken);
  }

  public clearLocalUserData() {
    localStorage.removeItem('devio.token');
    localStorage.removeItem('devio.user');
  }

  public getUserToken(): string {
    return localStorage.getItem('devio.token');
  }

  public saveUserToken(token: string) {
    localStorage.setItem('devio.token', token);
  }

  public saveUser(user: string) {
    localStorage.setItem('devio.user', JSON.stringify(user));
  }
}
