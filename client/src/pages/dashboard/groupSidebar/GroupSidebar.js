import React from 'react'

import './GroupSidebar.css'

const GroupSidebar = () => {

    const SidebarButton = () => {
        return (
            <button className='sidebarButton'>
                <i className='fa-solid fa-user-group'></i>
            </button>
        )
    }

    return (
        <aside className='groupSidebarContainer'>
            <SidebarButton />
        </aside>
    )
}

export default GroupSidebar