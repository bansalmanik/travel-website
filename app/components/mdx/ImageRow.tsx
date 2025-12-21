interface ImageRowProps {
  children: React.ReactNode
}

export default function ImageRow({ children }: ImageRowProps) {
  return (
    <div className="flex gap-4 my-6 justify-center flex-wrap">
      {children}
    </div>
  )
}
