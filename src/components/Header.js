import React from 'react'
import Popup from "reactjs-popup";


const Header = props => (
  <header style={{marginBottom: 10}}>
    <div>
      <span className="header"> {props.title} </span>
    </div>

    <div>
      <span className="subheader"> POWERED BY

        <a className="link" target="_blank" rel="noopener noreferrer" href="http://github.com/elxw"> EGGS </a> &
        <Popup trigger={<a className="link"> BACON </a>} mouseEnterDelay={500} on="hover">
          {close => (
            <div className="popup">
              Data provided for free by
              <a target="_blank" rel="noopener noreferrer" href="https://iextrading.com/developer"> IEX</a>.
              View <a target="_blank" rel="noopener noreferrer" href="https://iextrading.com/api-exhibit-a/"> IEX’s Terms of Use</a>.
            </div>
          )}
        </Popup>

      </span>
    </div>
  </header>
)

export default Header

