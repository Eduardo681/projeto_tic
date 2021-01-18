import React from 'react'

export default props => {
    return (
        <button type="button" className="btn" style={{width: "2.5rem", borderRadius: 1000 , margin: 0, padding: 0}}>
        <img src="/buttons/bt-chat.png" alt=""
          style={{
              width: "100%"
          }}
          onClick={props.click}></img>
      </button>
    )
}