import React from 'react'
import '../../styles/home/home.scss'
import Hero from './Hero'
import NewestMembers from './NewestMembers'
import Join from './Join'
import AddInvestment from './AddInvestment'
import PublishVaccancies from './PublishVaccancies'
import FeaturedPosts from './FeaturedPosts'
import RecentPosts from './RecentPosts'

const Home = () => {
  return (
    <>
        <Hero/>
        <NewestMembers/>
        <Join/>
        <AddInvestment/>
        <PublishVaccancies/>
        <FeaturedPosts/>
        <RecentPosts/>
    </>
  )
}

export default Home