export interface Props {
  sessionID: string
}

export const SessionStatus = ({ sessionID }: Props) => {
  const text = sessionID
    ? 'You already have active quiz.'
    : 'There is no active quizzes.'
  return <p>{text}</p>
}
