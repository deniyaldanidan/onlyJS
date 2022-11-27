function sum (num:number):number {
    return num + 2
}

function startsWithS(str:string):boolean | never{
    if (str==="anna") throw Error("anna is dangerous");
    return str.charAt(0).toLowerCase() === "s"
}

sum(24);
startsWithS("sandra");