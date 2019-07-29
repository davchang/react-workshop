import React, { useEffect } from 'react'
import SVGInjector from 'svg-injector'

export default function HelloWorld() {

  useEffect(() => {
    const mySVGsToInject = document.querySelectorAll('img.injectSVG');
    SVGInjector(mySVGsToInject);
  })

  return (
    <div className='helloWorld'>
{/*
      <button className='button topNav__button'>
        <img data-transfer-direction="download" data-src="src/globals/images/iconic/cloud-transfer.svg" className="iconic iconic-sm injectSVG" alt="cloud-transfer" />
        <span className="button__text">Upload</span>
      </button>
*/}
      <img data-transfer-direction="upload" src="src/globals/images/iconic/data-transfer.svg" className="iconic iconic-sm injectSVG" alt="data-transfer" />

    </div>
  )
}
