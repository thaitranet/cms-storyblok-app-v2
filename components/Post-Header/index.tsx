import Avatar from '@/components/Avatar'
import Date from '@/components/Date'
import CoverImage from '@/components/Cover-Image'
import PostTitle from '@/components/Post-Title'

export default function PostHeader({ title, coverImage, date, author }: { title: string, coverImage: { filename: string }, date: string, author: { name: string, content: { profile_picture: { filename: string } } } }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.content.profile_picture} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} url={coverImage.filename} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.content.profile_picture} />
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}
