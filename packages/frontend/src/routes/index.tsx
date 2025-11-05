import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useUserStore, clearSessionID } from '@/stores/user'
import { SessionStatus } from '@/components/features/session/status'
import { SessionControls } from '@/components/features/session/controls'

const HomePage = () => {
  const [name, setName] = useState('')
  const sessionID = useUserStore()
  const navigate = useNavigate()

  const handleSubmit = () => navigate({ to: '/quiz', ...(name && !sessionID && { search: { name } }) })

  const handleChangeName = (name: string) => setName(name)

  const handleStartNew = () => {
    clearSessionID()
    navigate({ to: '/quiz', ...(name && { search: { name } }) })
  }

  return (
    <div className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
      <SessionStatus sessionID={sessionID} />
      <SessionControls
        sessionID={sessionID}
        onSubmit={handleSubmit}
        onChangeName={handleChangeName}
        onStartNew={handleStartNew}
      />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: HomePage,
})
