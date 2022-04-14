import React from 'react'

import Button from '../../../shared/components/button/Button'
import { logout } from '../../../shared/utils'
import './Appbar.css'

const Appbar = () => {
    return (
        <header className='appbarContainer'>
            <Button text="Logout" className='logoutBtn' onClick={logout}>
                <i className='fa-solid fa-arrow-right-from-bracket'></i>
            </Button>
        </header>
    )
}

export default Appbar