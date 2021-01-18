import React from 'react'

export default props => {
    return (
        <button type="button" className="btn btn-lg">
        <img src="buttons/bt-return.png" alt=""
          style={{
            width: "40%",
            display: "block"
          }}
          onClick={props.click}></img>
      </button>
    )
}