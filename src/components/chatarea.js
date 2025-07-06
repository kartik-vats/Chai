import React from 'react'

function chatarea() {
  return (
    <div className="flex flex-col items-center justify-center p-4 m-1 gap-4 bg-gray-100 min-h-screen">
  {/* Header */}
  <h1 className="flex items-center justify-center h-12 w-full bg-gray-800 text-white text-xl font-semibold rounded">
    Chat Area
  </h1>

  {/* Chat Messages Area */}
  <div className="flex-1 w-full bg-yellow-200 text-black rounded p-2 overflow-auto">
    {/* messages go here */}
  </div>

  {/* Input Footer */}
  <div className="h-20 w-full bg-yellow-600 text-white flex items-center justify-center rounded">
    {/* input or buttons go here */}
    Type your message...
  </div>
</div>

  )
}

export default chatarea
