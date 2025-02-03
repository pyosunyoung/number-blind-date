import React from 'react'
import { Outlet } from 'react-router-dom'
const AppLayout = () => {
  return (
    <div>
      <nav>
        네브바바 {/* 네브바 영역 */}
      </nav>
      <main>
        <Outlet /> {/* 라우터가 렌더링될 공간 */}
      </main>
    </div>
  )
}

export default AppLayout
