
/**
 * 
 * @param url = url of the link
 * @param arg = is a object with two properties {data:data to send, method: "POST" || "PUT" || "DELETE"}
 * @returns 
 */
export const sendReq = (url: string, { arg }: { arg: any }) => fetch(url,
    {
        method: arg?.method || "POST",
        body: JSON.stringify(arg.data),
        headers: [["Content-Type", "application/json"]]
    }
).then(res => res.json());

