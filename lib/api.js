async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch('https://gapi.storyblok.com/v1/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Token: process.env.STORYBLOK_API_KEY,
      Version: preview ? 'draft' : 'published',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getPreviewPostBySlug(slug) {
  const post = await fetchAPI(
    `
  query PostBySlug($slug: ID!) {
    PostItem(id: $slug) {
      slug
    }
  }
  `,
    {
      preview: true,
      variables: {
        slug: `posts/${slug}`,
      },
    }
  )
  return post
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      ArticlepageItems {
        items {
          slug
        }
      }
    }
  `)
  return data?.ArticlepageItems.items
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    {
      ArticlepageItems(sort_by: "first_published_at:desc") {
        items {
          slug
          published_at
          first_published_at
          content {
            text
            teaser
            headline
            image {
              filename
            }
            author {
              name
              content
            }
          }
        }
      }
    }
  `,
    { preview }
  )
  return data?.ArticlepageItems.items
}

export async function getPostAndMorePosts(slug, preview) {
  
  const data = await fetchAPI(
    `
  query PostBySlug($slug: ID!) {
    ArticlepageItem(id: $slug) {
      slug
      published_at
      first_published_at
      id
      content {
        text
        teaser
        headline
        image {
          filename
        }
        author {
          name
          content
        }
      }
    }
    ArticlepageItems(per_page: 3, sort_by: "first_published_at:desc") {
      items {
        slug
        published_at
        first_published_at
        content {
          text
          teaser
          headline
          image {
            filename
          }
          author {
            name
            content
          }
        }
      }
    }
  }
  `,
    {
      preview,
      variables: {
        slug: `articles/${slug}`,
      },
    }
  )

  return {
    post: data?.ArticlepageItem,
    morePosts: (data?.ArticlepageItems?.items || [])
      .filter((item) => item.slug !== slug)
      .slice(0, 2),
  }
}
