import React, { useEffect } from 'react'
import $ from 'jquery'


export default function HelloWorld() {
  useEffect(() => {
    console.log('--foo--')
    $('#username').text('Hello David')
  })

  return (
    <>
      <p>Test on Jquery</p>
      <div>
        <div id='username' className='username' />
      </div>
    </>
  )
}
