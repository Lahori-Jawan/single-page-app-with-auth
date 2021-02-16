export const TOKEN = 'access_token';

const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN)
  },

  setToken(accessToken) {
    localStorage.setItem(TOKEN, accessToken)
  },

  clearStorage() {
    localStorage.removeItem(TOKEN)
    console.log('clearing token')
  }

}

export { TokenService }