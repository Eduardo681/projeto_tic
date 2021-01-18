import React from 'react'

export default props => {
    const styles = {
        btn: {
            fontFamily: "Viga, sans-serif",
            backgroundColor:'#0B0B2B',
            borderColor: '#01BFAF',
            color: '#01BFAF',
            boxSizing: 'content-box',
            borderWidth: '4px',
            borderRadius: '13px',
            width: props.width,
            fontSize: props.fontSize
        }
    }
    return (
       
        <button style={styles.btn} type="submit" className="btn btn-lg">
            Realizar Pagamento
        </button>
    )
}