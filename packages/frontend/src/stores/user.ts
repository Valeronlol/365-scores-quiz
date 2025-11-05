import { Store, useStore } from '@tanstack/react-store'

const SESSION_STORAGE_KEY = 'current_session_id'
const initial = localStorage.getItem(SESSION_STORAGE_KEY) ?? ''
const sessionStore = new Store(initial)

export const useUserStore = () => useStore(sessionStore)

export const setSessionID = (id: string) => {
  localStorage.setItem(SESSION_STORAGE_KEY, id)
  sessionStore.setState(() => id)
}

export const clearSessionID = () => {
  localStorage.removeItem(SESSION_STORAGE_KEY)
  sessionStore.setState(() => '')
}
