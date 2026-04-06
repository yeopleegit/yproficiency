import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'

interface Props {
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ title, message, confirmLabel = '삭제', onConfirm, onCancel }: Props) {
  return (
    <Modal title={title} onClose={onCancel}>
      <div className="flex gap-3 mb-4">
        <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg shrink-0 h-fit">
          <AlertTriangle size={20} className="text-red-600 dark:text-red-400" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          취소
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
