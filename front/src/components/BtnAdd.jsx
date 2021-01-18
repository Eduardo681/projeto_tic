import React from 'react'

export default props => {
    return (
        <button type="button" data-toggle="modal" data-target="#modalAd" className="btn" style={{width: props.width, borderRadius: 1000 , margin: 0, padding: 0}}>
        <img src="/buttons/bt-add.png" alt=""
          style={{
              width: "100%"
          }}
          onClick={props.click}></img>
      </button>
    )
}