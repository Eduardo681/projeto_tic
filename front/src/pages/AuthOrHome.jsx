import React from "react"

export default () => {
    return <>
        Carregando
        {localStorage.getItem('token') ? window.location.href = '/homeUser'
         : window.location.href = '/homeScreen'}
    </>
}

