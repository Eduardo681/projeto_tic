import React from 'react'

export default props => {
    return (
        <button type="button" className="btn" style={{width: props.width, borderRadius: 1000 , margin: 0, padding: 0}}>
        <img src="/buttons/bt-delete.png" alt=""
          style={{
              width: "100%"
          }}
          onClick={props.click}></img>
      </button>
    )
}