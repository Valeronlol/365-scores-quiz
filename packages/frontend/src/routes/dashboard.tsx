import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { statisticsApi } from '@/api/resources/statistics'
import { STATISTICS_NOTIFICATION_EVENT_NAME } from '@/constants'

const Dashboard = () => {
  const statisticsQuery = useQuery({
    queryKey: ['statistics'],
    queryFn: () => statisticsApi.getStatistics(),
  })

  useEffect(() => {
    const stream = statisticsApi.getEventStream()

    stream.onopen = () => console.info('✅ SSE connection established')

    stream.onerror = (error) => console.error('❌ SSE error:', error)
  
    stream.addEventListener(STATISTICS_NOTIFICATION_EVENT_NAME, () => {
      statisticsQuery.refetch()
    })

    return () => {
      stream.close()
    }
  }, [])

  return (
    <div className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
      <Table className="max-w-4xl m-[auto]">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Session ID</TableHead>
            <TableHead className="font-bold">Username</TableHead>
            <TableHead className="text-right font-bold">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {statisticsQuery.isFetched && statisticsQuery.data?.data?.map((row) => (
            <TableRow key={row.userId}>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row?.name || 'Anonymous'}</TableCell>
              <TableCell className="text-right">
                {row.score || 0}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})
