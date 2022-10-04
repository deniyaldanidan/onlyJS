import React from 'react'
import { CLink1 } from '../../components/CustLinks';
import { Showcaser1 } from '../../components/Showcasers';


const Extras = () => {
  return (
    <Showcaser1>
      <CLink1 to="/parallax1">Parallax-1</CLink1>
      <CLink1 to="/parallax2">Parallax-2</CLink1>
      <CLink1 to="/layout1">Layout-1</CLink1>
      <CLink1 to="/layout2">Layout-2</CLink1>
      <CLink1 to="/drag1">Drag-1</CLink1>
      <CLink1 to="/reorder1">Reorder-1</CLink1>
    </Showcaser1>
  )
}

export default Extras;
