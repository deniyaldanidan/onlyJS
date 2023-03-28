import { MouseEventHandler, useEffect, useState } from "react"




export default function MyMailer() {
    const [msg, setMsg] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");

    useEffect(() => {
        const fetchFn = async () => {
            const myRes = await fetch('http://localhost:3000/api/myMailer/verify', { method: "GET", credentials: "same-origin" });
            const data = await myRes.json();
            console.log(data);
            data?.msg && setMsg(data.msg)
            data?.success && setVerified(data.success)
            data?.error && setMsg(data.error)
        }
        fetchFn()
    }, [])

    const handleClick:MouseEventHandler = async (e)=>{
        e.preventDefault();
        if (!email.length || !subject.length){
            alert("Values are empty")
            return ;
        }
        try {
            const resp = await fetch("http://localhost:3000/api/myMailer/sendMail", {
                method: "POST", credentials: "same-origin", body: JSON.stringify({email, subject})
            });
            const data = await resp.json();
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h2>{msg}</h2>
            {
                verified ? (
                    <div style={{ margin: "50px auto", width: "700px" }}>
                        <h3>Send the email</h3>
                        <input type="email" style={{ display: "block", width: "600px", fontSize:"1rem" }} placeholder="Enter sender email here" value={email} onChange={e=>setEmail(e.target.value)} />
                        <textarea placeholder="Enter the subject here" value={subject} onChange={e=>setSubject(e.target.value)} style={{ display: "block", width: "600px", height: "300px", fontSize: "1rem", marginTop: "20px" }} ></textarea>
                        <button style={{display: "block", padding: "10px 40px", fontSize: "1rem", marginTop: "20px"}} onClick={handleClick} >Send</button>
                    </div>
                ) : ""
            }
        </>
    )
}