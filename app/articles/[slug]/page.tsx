import Container from '@/components/Container'
import Layout from '@/components/Layout'
import { Metadata } from 'next'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import { draftMode } from 'next/headers'
import PostHeader from '@/components/Post-Header'
import PostBody from '@/components/Post-Body'
import SectionSeparator from '@/components/Section-Separator'
import MoreStories from '@/components/More-Stories'
import Header from '@/components/Header'
import StoryblokClient from 'storyblok-js-client'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Post'
}

export default async function Post({ params }: { params: { slug: string } }) {

  const { isEnabled } = draftMode()
  const preview = isEnabled

  const data = await getPostAndMorePosts(params.slug, preview)

  if (!data.post) return notFound()

  const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_API_KEY });

  const post = {
    ...data.post,
    html: data.post?.content?.text
      ? Storyblok.richTextResolver.render(data.post.content.text)
      : null,
  }

  const morePosts = data.morePosts

  return (
    <Layout>
      <Container>

        <Header />

        <article>

          <PostHeader
            title={post.content.headline}
            coverImage={post.content.image}
            date={post.first_published_at || post.published_at}
            author={post.content.author}
          />

          <PostBody content={post.html} />

        </article>
        <SectionSeparator />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  )
}

export async function generateStaticParams() {

  const allPosts = await getAllPostsWithSlug()

  return allPosts?.map((post: any) => ({
    slug: `${post.slug}`,
  }))

}
