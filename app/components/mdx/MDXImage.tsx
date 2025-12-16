import Image from 'next/image'

interface MDXImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export default function MDXImage({ src, alt, width, height }: MDXImageProps) {
  // If width/height provided, use them to control aspect ratio
  if (width && height) {
    return (
      <div className="my-6 flex justify-center">
        <div 
          className="relative rounded-lg shadow-md overflow-hidden"
          style={{ 
            width: `${width}px`, 
            height: `${height}px`,
            maxWidth: '100%',
            aspectRatio: `${width} / ${height}`
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={`(max-width: 768px) 100vw, ${width}px`}
          />
        </div>
      </div>
    )
  }

  // Default: responsive image with max-width
  return (
    <div className="my-6 mx-auto block max-w-2xl">
      <img
        src={src}
        alt={alt}
        className="rounded-lg shadow-md w-full h-auto"
      />
    </div>
  )
}
