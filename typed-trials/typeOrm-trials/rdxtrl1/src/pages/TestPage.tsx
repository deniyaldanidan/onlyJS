import useTestAuthQuery from "../features/test/testSlice";


const TestPage = ():JSX.Element=>{
    const {data, isError, error, isSuccess} = useTestAuthQuery();

    if (isError){
        console.log(error);
        return <div className="info-bar danger">Error Happened in Test-Page</div>
    }

    if (isSuccess){
        return <div className="info-bar">Hello {data.fname + " " + data.lname}, You're username is {data.uname}</div>
    }

    return <div className='info-bar'>Loading...</div>
}

export default TestPage;