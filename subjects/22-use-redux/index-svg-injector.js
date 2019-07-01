import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactSVG from 'react-svg'
import { SVGInjector } from '@tanem/svg-injector'
import { ReactSvgInjector, Mutate } from 'react-svg-injector'
import './styles.scss'

function randomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

class ReactSvgInjectorExample extends Component {
  state = {
    color: randomHexColor()
  }
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  onClick() {
    this.setState({ color: randomHexColor() })
  }
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <ReactSvgInjector src={'src/globals/images/sample.svg'} className='App-logo' alt='logo'>
            <Mutate
              selector='g'
              fill={this.state.color}
              onClick={this.onClick}
            />
          </ReactSvgInjector>
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default function HelloWorld() {

  function handleClick(e) {

    SVGInjector(document.getElementsByClassName('inject-me'), {
      afterAll(elementsLoaded) {
        console.log(`injected ${elementsLoaded} elements`)
      },
      afterEach(err, svg) {
        if (err) {
          throw err
        }
        console.log(`injected ${svg.outerHTML}`)
      },
      beforeEach(svg) {
        svg.setAttribute('stroke', 'red')
      },
      evalScripts: 'once',
      renumerateIRIElements: 'false'
    })
  }


  function handleReactSVGClick(e) {
    ReactDOM.render(<ReactSVG
      src='src/globals/images/sample.svg'
      afterInjection={(error, svg) => {
        if (error) {
          console.error(error)
          return
        }
        console.log(svg)
      }}
      beforeInjection={svg => {
        svg.classList.add('svg-class-name')
        svg.setAttribute('style', 'width: 200px')
      }}
      evalScripts='always'
      fallback={() => <span>Error!</span>}
      loading={() => <span>Loading</span>}
      renumerateIRIElements={false}
      wrapper='span'
      className='wrapper-class-name'
      onClick={() => {
        console.log('wrapper onClick')
      }}
    />, document.getElementById('inject-me-id'))
  }

  return (
    <div className='helloWorld'>

{/* ReactSvgInjector */}
{/*
    <ReactSvgInjectorExample />

*/}

{/* SVGInjector */}
{/*
      <button onClick={handleClick}>CLick Me to inject SVG</button>
      <br/>
      <div class='inject-me' data-src='src/globals/images/sample.svg'></div>
*/}


{/* ReactSVG
  <ReactSVG src='../../src/globals/images/sample.svg' />
*/}



      <button onClick={handleReactSVGClick}>CLick Me to inject SVG</button>
      <br/>
      <div id='inject-me-id'></div>



    </div>
  )
}

// export default function HelloWorld() {
//
//   useEffect(() => {
//     const mySVGsToInject = document.getElementById('thumb-icon');
//     // Do the injection
//     SVGInjector(mySVGsToInject);
//   })
//
//   return (
//     <div className='helloWorld'>
//
//       <img id="thumb-icon" className="inject-me" src="src/globals/images/iconic/thumb.svg" title="I like it!" alt="thumb" />
//
//     </div>
//   )
// }


// <img id="image-one" class="inject-me" data-src="image-one.svg">
// <img id="image-two" class="inject-me" data-src="image-two.svg">

// <img class="inject-me" data-transfer-direction="download" data-src="src/globals/images/iconic/cloud-transfer.svg" className="iconic" alt="cloud-transfer" />
// Calculate</button>
