import { useEffect, useState } from "react"


export default function Test() {
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchFn = async () => {
            const myRes = await fetch('http://localhost:3000/api/hello', { method: "GET", credentials: "same-origin" });
            const data = await myRes.json();
            // console.log(data);
            data?.name && setName(data.name)
        }
        fetchFn()
    }, [])

    return <div className="info-page">{name.length ? name : "No Name is Fetched"}</div>
}