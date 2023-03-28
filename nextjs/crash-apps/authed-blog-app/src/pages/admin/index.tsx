
// import {SessionContext} from 'next-auth/react';
// import { useContext } from 'react';



export default function Admin(){
    // const context = useContext(SessionContext);

    // console.log(context, 'apple');

    return <div className="info-page">Hello, Admin</div>
}

Admin.myAuthInfo = {
    allowedRoles: ["admin"]
}