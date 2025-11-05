import type { ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export interface Props {
  sessionID: string
  onSubmit: () => void
  onStartNew: () => void
  onChangeName: (name: string) => void
}

export const SessionControls = ({
  sessionID,
  onSubmit,
  onChangeName,
  onStartNew,
}: Props) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChangeName(e.target.value)

  const text = sessionID ? 'Continue the current one' : 'Start new quiz'

  return (
    <>
      <Input
        type="text"
        placeholder="Enter your name(optional)"
        className="max-w-sm mt-8"
        onChange={handleOnChange}
      />

      <div className="mt-6" >
        <Button className="m-2" onClick={onSubmit}>
          {text}
        </Button>

        {sessionID && (
          <Button className="m-2" onClick={onStartNew}>
            Start a fresh run
          </Button>
        )}
      </div>
    </>
  )
}
