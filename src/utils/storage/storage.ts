import { AuthStorageKeys } from '@/constants'

export interface SetCredentialsParams {
  token: string
  refreshToken: string
}

class Storage {
  public setCredentials({ token, refreshToken }: SetCredentialsParams) {
    if (token) {
      localStorage.setItem(AuthStorageKeys.ACCESS_TOKEN, `Bearer ${token}`)
      localStorage.setItem(
        AuthStorageKeys.REFRESH_TOKEN,
        `Bearer ${refreshToken}`
      )
    }
  }

  public removeCredentials() {
    localStorage.removeItem(AuthStorageKeys.ACCESS_TOKEN)
    localStorage.removeItem(AuthStorageKeys.REFRESH_TOKEN)
  }

  public getTokens(): {
    accessToken: string | null
    refreshToken: string | null
  } {
    return {
      accessToken: localStorage.getItem(AuthStorageKeys.ACCESS_TOKEN),
      refreshToken: localStorage.getItem(AuthStorageKeys.REFRESH_TOKEN),
    }
  }
}

export const useStorage = new Storage()
