import React from 'react'

import './AuthContainer.css'

const AuthContainer = props => {
    return (
        <div className='authFormContainer'>
            <div className='authFormWrapper'>{props.children}</div>
        </div>
    )
}

export default AuthContainer