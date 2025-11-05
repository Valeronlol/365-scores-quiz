import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import type { Answer } from '@/api/resources/answers'

export interface Props {
  answers: Array<Answer>
  onSubmit: (answerId: number) => void
  isSubmitDisabled?: boolean
}

export const QuestionList = ({
  answers = [],
  onSubmit,
  isSubmitDisabled = false,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (selectedValue) {
      onSubmit(Number(selectedValue))
      setSelectedValue('')
    }
  }

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      <RadioGroup
        className="pt-10 pb-10"
        value={selectedValue}
        onValueChange={setSelectedValue}
      >
        {answers.map(({ id, content }) => {
          const representationId = String(id)
          return (
            <div className="flex items-center gap-2" key={id}>
              <RadioGroupItem
                value={representationId}
                id={representationId}
                disabled={isSubmitDisabled}
              />
              <Label htmlFor={representationId}>{content}</Label>
            </div>
          )
        })}
      </RadioGroup>

      <Button disabled={!selectedValue || isSubmitDisabled} type="submit">
        Submit
      </Button>
    </form>
  )
}
