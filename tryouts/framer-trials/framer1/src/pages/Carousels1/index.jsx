import React from 'react';
import { FloatingLink } from '../../components/CustLinks';
import Cards1 from './Cards1';

const Carousels1 = ()=>{
    return (
        <>
            <Cards1/>
            <FloatingLink to="/extras">Extras</FloatingLink>
        </>
    )
}

export default Carousels1;