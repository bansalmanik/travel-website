import Image from 'next/image'

interface MDXImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export default function MDXImage({ src, alt, width, height }: MDXImageProps) {
  // If width/height provided, use them; otherwise use responsive sizing
  if (width && height) {
    return (
      <span className="flex justify-center block">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-lg shadow-md"
          style={{ width: `${width}px`, height: 'auto' }}
        />
      </span>
    )
  }

  // Default: responsive image with max-width
  return (
    <span className="my-6 max-w-2xl mx-auto block">
      <img
        src={src}
        alt={alt}
        className="rounded-lg shadow-md w-full h-auto"
      />
    </span>
  )
}
