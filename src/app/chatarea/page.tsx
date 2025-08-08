
import React from 'react'
import Chatarea from '@/components/chatarea'
import Contactbar from '@/components/contactbar'
import '@/app/globals.css'
function page() {
  return (
    <div>
      
      <div className='chatbox'>
      <div className='flex flex-row h-screen w-1/2'>
      <Contactbar/>
      </div>
      <div className='h-screen w-1/2'>
      <h1>hi i am chat area</h1>
      </div>
    </div>
    </div>
    
  )
}

export default page
