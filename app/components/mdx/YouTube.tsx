'use client'

interface YouTubeProps {
  videoId: string
  title?: string
}

export default function YouTube({ videoId, title = 'YouTube video' }: YouTubeProps) {
  return (
    <div className="my-8">
      <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  )
}
