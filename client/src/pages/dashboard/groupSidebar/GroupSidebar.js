import React from 'react'

import './GroupSidebar.css'

const GroupSidebar = () => {

    const SidebarButton = () => {
        return (
            <button className='sidebarButton'>
                <i class="fa-solid fa-people-arrows-left-right"></i>
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