import React from 'react'
import { H2BTN } from '../styledComponents/Btns';
import Wrapper from '../styledComponents/Wrapper';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import {BsViewStacked} from 'react-icons/bs';
import {AiOutlineHome, AiOutlineLogout, AiOutlinePlusCircle} from 'react-icons/ai';
import useAuth from '../context/AuthContext';

const LinksPage = () => {
  const handleLogout = useLogout();
  const {isAdmin, isEditor} = useAuth();

  return (
    <Wrapper>
      <h1>LinksPage</h1>
      <div style={{marginTop:"40px", marginBottom:"20px", display:"flex", justifyContent:"space-evenly"}}>
        <H2BTN as={Link} to="/blogs"><BsViewStacked/></H2BTN>
        <H2BTN as={Link} to="/"><AiOutlineHome/></H2BTN>
        { (isEditor || isAdmin) ? <H2BTN as={Link} to="/create-blog"><AiOutlinePlusCircle/></H2BTN> : "" }
        <H2BTN onClick={handleLogout}><AiOutlineLogout/></H2BTN>
      </div>
    </Wrapper>
  )
}

export default LinksPage;