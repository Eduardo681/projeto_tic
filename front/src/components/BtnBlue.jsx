import React from 'react'

export default props => {
    const styles = {
        btn: {
            fontFamily: "Viga, sans-serif",
            backgroundColor:'#0B0B2B',
            borderColor: '#069CC6',
            color: '#069CC6',
            boxSizing: 'content-box',
            borderWidth: '4px',
            borderRadius: '13px',
            width: props.width,
            fontSize: props.fontSize
        }
    }
    return (
       
        <button style={styles.btn} type="button" className="btn btn-lg" onClick={props.click}>
            {props.text}
        </button>
    )
}