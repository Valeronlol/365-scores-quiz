import { useCallback, useEffect, useState } from 'react'
import { createFileRoute, useSearch, useNavigate } from '@tanstack/react-router'
import { useQuery, useMutation } from '@tanstack/react-query'
import { toast, type ExternalToast } from 'sonner'
import { QuestionList } from '@/components/features/quiz/question_list'
import { useCreateUser } from '@/hooks/use-users'
import { questionsApi } from '@/api/resources/questions'
import { clearSessionID, useUserStore } from '@/stores/user'
import { QUESTION_TIMEOUT } from '@/constants'

const toastOpts: ExternalToast = { position: 'top-center' }

const Quiz = () => {
  const navigate = useNavigate()
  const { name }: { name?: string } = useSearch({ from: '/quiz' })
  const sessionID = useUserStore()
  const [refetchTimer, setRefetchTimer] = useState<NodeJS.Timeout>()

  useCreateUser(name)

  const questionQuery = useQuery({
    queryKey: ['question'],
    queryFn: () => questionsApi.getQuestion(sessionID),
    enabled: Boolean(sessionID),
  })

  const submitQuestionMutation = useMutation({
    mutationFn: ({
      questionId,
      userId,
      answerId,
    }: {
      questionId: number
      answerId: number
      userId: string
    }) => questionsApi.submitQuestion(questionId, answerId, userId),
    onSuccess: (response) => {
      response.points > 0
        ? toast.success(
            `Your answer is correct, you got +${response.points} points!`,
            toastOpts,
          )
        : toast.error('You answered incorrectly', toastOpts)

      const timeout = setTimeout(() => {
        questionQuery.refetch()
        setRefetchTimer(undefined)
      }, QUESTION_TIMEOUT)

      setRefetchTimer(timeout)
    },
  })

  useEffect(() => {
    return () => {
      if (refetchTimer) {
        clearTimeout(refetchTimer)
      }
    }
  }, [refetchTimer])

  useEffect(() => {
    if (questionQuery.isFetched && questionQuery.data?.data === null) {
      toast.success(
        `You answered all the questions, congratulations. See the results!`,
        toastOpts,
      )
      navigate({ to: '/dashboard' })
      clearSessionID()
    }
  }, [questionQuery])

  const handleAnswerSubmit = useCallback(
    (answerId: number) => {
      if (questionQuery.isLoading || !questionQuery.data) {
        return Promise.reject('Still loading')
      }
      return submitQuestionMutation.mutate({
        questionId: questionQuery.data.data.id,
        answerId,
        userId: sessionID,
      })
    },
    [sessionID, questionQuery.data],
  )

  return (
    <div className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
      {questionQuery.isFetched && (
        <div>{questionQuery.data?.data?.content}</div>
      )}
      <QuestionList
        answers={questionQuery.data?.data?.answers ?? []}
        onSubmit={handleAnswerSubmit}
        isSubmitDisabled={Boolean(refetchTimer)}
      />
    </div>
  )
}

export const Route = createFileRoute('/quiz')({
  component: Quiz,
})
