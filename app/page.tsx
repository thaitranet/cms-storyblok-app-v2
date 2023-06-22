import MoreStories from '@/components/More-Stories'
import Container from '@/components/Container'
import Intro from '@/components/Intro'
import Layout from '@/components/Layout'
import HeroPost from '@/components/Hero-Post'
import { getAllPostsForHome } from '@/lib/api'
import { draftMode } from 'next/headers'

export default async function Home({ params }: { params: { slug: string } }) {

  const { isEnabled } = draftMode()

  const preview = isEnabled

  const allPosts = (await getAllPostsForHome(preview)) || []
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <Layout>
      <Container>
        <Intro />
        {heroPost && (
            <HeroPost
              title={heroPost.content.headline}
              coverImage={heroPost.content.image}
              date={heroPost.first_published_at || heroPost.published_at}
              author={heroPost.content.author}
              slug={heroPost.slug}
              excerpt={heroPost.content.teaser}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  )
}
