import { CanceledError } from 'axios';
import { useEffect, useState } from 'react';
import { client1 } from '../api/client';
import { useAppSelector } from '../app/hooks';

type testResType = {
    uname: string,
    fname: string,
    lname: string
}

const initialtestRes = {
    uname: "",
    fname: "",
    lname: ""
}

const TestPage = ():JSX.Element=>{

    const [data, setData] = useState<testResType>(initialtestRes);
    const {isAuth, access_token} = useAppSelector(state=>state.auth.data);

    useEffect(()=>{
        let controller:AbortController = new AbortController();
        let isMounted = true;
        const getResponse = async ()=>{
            try {
                const result = await client1.get("/test", {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    signal: controller.signal
                });
                if (isMounted){
                    console.log(result.data)
                    setData(result.data as testResType)
                }
            } catch (error) {
                if (error instanceof CanceledError){
                    return;
                }
                console.log(error)
            }
        }

        isAuth ? getResponse() : setData(initialtestRes)

        return ()=>{
            isMounted = false;
            controller.abort()
        }
    }, [isAuth, access_token])

    return <div className='info-bar'>{!isAuth ? "Hello Guest, Welcome to Ideas App" : `Hello ${data.fname + " " + data.lname}, Welcome to Ideas App. you're username is ${data.uname}`}</div>
}

export default TestPage;