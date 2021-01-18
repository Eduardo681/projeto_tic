import React from 'react';

export default () => {
    localStorage.removeItem('token');
    return (
        <>
            {window.location.href = '/'}
        </>
    )
}