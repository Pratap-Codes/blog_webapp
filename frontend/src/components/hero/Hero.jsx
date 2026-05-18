import React from 'react'

const Hero = () => {
  return (
    <div className='px-4 md:px-0'>
    <div className='max-w-5xl mx-auto flex flex-col md:flex-row h-[600px] items-center my-10 md:my-0'>
        {/* text section */}
        <div>
            <h2>Explore the Latest Tech & Web Trends</h2>
            <h4>Stay ahead with in depth articles tutorials and insights on web development digital marketing and tech information</h4>
        <div className='flex gap-2'>
            <button>Get Started</button>
            <button>Lean More</button>
        </div>
        </div>
        <div className='flex-1'>
            <img src="blog.bg.jpg" alt="Blog-BG" className='w'/>
        </div>
    </div>
      
    </div>
  )
}

export default Hero
