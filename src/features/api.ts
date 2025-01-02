/* eslint-disable unicorn/no-null */

import { RTKTagNames } from '@/constants'
import { SERVER_URL } from '@/constants/server-url'

import { useStorage } from '@/utils/storage'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

export const baseUrl = `${SERVER_URL}/api`

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers: any) => {
    const accessToken = useStorage.getTokens().accessToken?.split(' ')[1]
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    headers.set('Accept', 'application/json')
    return headers
  },
})

const customFetchBase = async (args: any, api: any, extraOptions: any) => {
  await mutex.waitForUnlock()

  const accessToken = useStorage.getTokens().accessToken?.split(' ')[1]

  if (args.url === '/auth/me' && !accessToken) {
    return { data: null }
  }

  let result = await baseQuery(args, api, extraOptions)

  // if (
  //   (result.error as any)?.error &&
  //   result.error?.status === 401 &&
  //   accessToken
  // ) {
  //   if (!mutex.isLocked()) {
  //     const release = await mutex.acquire()

  //     try {
  //       const refreshResult = (await baseQuery(
  //         {
  //           url: EndpointNameAuth.REFRESH_TOKEN,
  //           body: {
  //             accessToken: api.getState()?.auth?.token,
  //             refreshToken: api.getState()?.auth?.refreshToken,
  //           } as RefreshTokenRequest,
  //           method: 'POST',
  //         },
  //         api,
  //         extraOptions
  //       )) as any

  //       if (refreshResult.data) {
  //         result = await baseQuery(args, api, extraOptions)
  //       }
  //     } finally {
  //       release()
  //     }
  //   } else {
  //     await mutex.waitForUnlock()
  //     result = await baseQuery(args, api, extraOptions)
  //   }
  // }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: customFetchBase,
  tagTypes: Object.values(RTKTagNames),
  endpoints: () => ({}),
})
