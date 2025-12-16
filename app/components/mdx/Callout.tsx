interface CalloutProps {
  type?: 'info' | 'tip' | 'warning' | 'success'
  children: React.ReactNode
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: '💡',
      iconBg: 'bg-blue-100',
      text: 'text-blue-900',
    },
    tip: {
      container: 'bg-emerald-50 border-emerald-200',
      icon: '✨',
      iconBg: 'bg-emerald-100',
      text: 'text-emerald-900',
    },
    warning: {
      container: 'bg-amber-50 border-amber-200',
      icon: '⚠️',
      iconBg: 'bg-amber-100',
      text: 'text-amber-900',
    },
    success: {
      container: 'bg-green-50 border-green-200',
      icon: '✓',
      iconBg: 'bg-green-100',
      text: 'text-green-900',
    },
  }

  const style = styles[type]

  return (
    <div className={`my-6 rounded-lg border-l-4 p-4 ${style.container}`}>
      <div className="flex gap-3">
        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${style.iconBg}`}>
          <span className="text-lg">{style.icon}</span>
        </div>
        <div className={`flex-1 ${style.text}`}>
          {children}
        </div>
      </div>
    </div>
  )
}
