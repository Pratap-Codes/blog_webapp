import React from 'react'
import Hero from '../components/hero/Hero'
import RecentBlog from '../components/RecentBlog'
import PopularAuthorList from '../components/PopularAuthorList'

const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <RecentBlog />
      <PopularAuthorList />
    </div>
  )
}

export default Home
