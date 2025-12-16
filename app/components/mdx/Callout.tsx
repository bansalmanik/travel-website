interface CalloutProps {
  type?: 'info' | 'tip' | 'warning' | 'success'
  children: React.ReactNode
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: {
      icon: '💡',
    },
    tip: {
      icon: '✨',
    },
    warning: {
      icon: '⚠️',
    },
    success: {
      icon: '✓',
    },
  }

  const style = styles[type]

  return (
    <div className="my-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white border border-slate-200">
          <span className="text-lg">{style.icon}</span>
        </div>
        <div className="flex-1 text-slate-700">
          {children}
        </div>
      </div>
    </div>
  )
}
