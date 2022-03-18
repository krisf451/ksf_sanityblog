import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Banner from '../components/Banner'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      {/* Posts */}
      <div className="md:-6 grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/post/${post.slug.current}`} key={post._id}>
            <div className="group cursor-pointer overflow-hidden rounded-lg border">
              <img
                src={urlFor(post.mainImage).url()!}
                alt=""
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
              />
              <div className="flex justify-between bg-white p-5">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  src={urlFor(post.author.image).url()!}
                  alt="user-pic"
                  className="h-12 w-12 rounded-full"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
  _id,
  title,
  author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
}`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
