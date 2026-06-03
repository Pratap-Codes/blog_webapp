import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ThemeProvider = ({children}) => {
    const {theme} = useSelector(state=>state.theme)
      useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
  return (
    <div  className={theme}>
      <div className='bg-gray-200 text-gray-800 dark:text-gray-200 dark:bg-[rgb(113,144,230)]'></div>
      {children}
    </div>
  )
}

export default ThemeProvider
