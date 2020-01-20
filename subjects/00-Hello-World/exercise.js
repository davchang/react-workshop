////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Change the contents of the render function and save the file
// - See the updates automatically in your browser without refreshing!
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <>
      <h2>HTML Forms</h2>

      <form action="http://localhost:8765/testForm" method='post'>
        First name:<br/>
        <input type="text" name="firstname" value="Mickey1"></input>
        <br/>
        Last name:<br/>
        <input type="text" name="lastname" value="Mouse2"></input>
        <br/><br/>
        <input type="submit" value="Submit"></input>
      </form>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"));
