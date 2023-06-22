import Avatar from '@/components/Avatar'
import Date from '@/components/Date'
import CoverImage from '@/components/Cover-Image'
import Link from 'next/link'

type Props = {
  title: string,
  coverImage: string,
  date: string,
  excerpt: string,
  author: { name: string, content: { profile_picture: { filename: string } } },
  slug: string
}

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
} : Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={`/articles/${slug}`} title={title} url={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/articles/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.content.profile_picture} />
    </div>
  )
}
