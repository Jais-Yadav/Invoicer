import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Features from '../Components/Features'
import Pricing from '../Components/Pricing'
import Footer from '../Components/Footer'

function Home() {
  return (
    <div>
        <Navbar/>
        <main className=''>
          <Hero/>
          <div>
            <Features/>
          </div>
          <Pricing/>
        </main>
        <Footer/>
    </div>
  )
}

export default Home