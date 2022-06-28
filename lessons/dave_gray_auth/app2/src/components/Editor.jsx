import React from 'react'
import {Link} from 'react-router-dom'

const Editor = () => {
  return (
    <div className="my-box">
      <div className="page-title">Editor's Page</div>
      <div className="page-info">Hello Editor.</div>
      <Link to="/">To Home Page</Link>
    </div>
  )
}

export default Editor