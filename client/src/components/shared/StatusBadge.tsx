import { statusColors, statusLabels, type DecayStatus } from '../../lib/decay'

interface Props {
  status: DecayStatus
  daysSince: number | null
  decayDays: number
}

export default function StatusBadge({ status, daysSince, decayDays }: Props) {
  const colors = statusColors[status]
  const label = statusLabels[status]

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
      <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
      {label}
      {daysSince !== null && (
        <span className="opacity-75">({daysSince}일 / {decayDays}일)</span>
      )}
      {daysSince === null && (
        <span className="opacity-75">(미연습)</span>
      )}
    </span>
  )
}
