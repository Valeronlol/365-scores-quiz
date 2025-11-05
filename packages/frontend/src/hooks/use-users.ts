import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { usersApi } from '@/api/resources/users'
import { setSessionID, useUserStore } from '@/stores/user'

interface CreateUserParams {
  name: string | undefined
  signal: AbortSignal
}

export const useCreateUser = (name?: string) => {
  const sessionID = useUserStore()

  const mutation = useMutation({
    mutationFn: (params: CreateUserParams) =>
      params.signal.aborted ? Promise.reject() : usersApi.createUser(params),
    onSuccess: ({ id }) => setSessionID(id),
  })

  useEffect(() => {
    if (!sessionID) {
      const ac = new AbortController()
      mutation.mutate({ name, signal: ac.signal })
      return () => {
        ac.abort()
      }
    }
  }, [sessionID, name])
}
