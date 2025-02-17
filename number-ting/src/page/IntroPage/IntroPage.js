import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../featueres/user/userSlice'

const IntroPage = () => {
  const dispatch = useDispatch()

  return (
    <div>
      IntroPage
      <button onClick={() => dispatch(logout())}>로그아웃</button>
    </div>
  )
}

export default IntroPage
