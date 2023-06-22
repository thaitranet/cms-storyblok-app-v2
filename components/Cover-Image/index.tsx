import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    title: string,
    url: any,
    slug?: string
}

export default function CoverImage({ title, url, slug } : Props) {

    const image = (
      <Image
        width={2000}
        height={1000}
        quality={100}
        alt={`Cover Image for ${title}`}
        src={url}
        className={cn('shadow-small', {
          'hover:shadow-medium transition-shadow duration-200': slug,
        })}
      />      
    )
    return (
      <div className="sm:mx-0">
        {slug ? (
          <Link href={slug} aria-label={title}>
            {image}
          </Link>
        ) : (
          image
        )}
      </div>
    )
  }