function startsWithS(str:string):boolean | never{
    if (str==="anna") throw Error("anna is dangerous");
    return str.charAt(0).toLowerCase() === "s"
}

//* Typed Anonymous fns
const printName : (name:string)=>string = (name)=>{
    return `Hi I'm ${name}`
}

//* Using Interface
interface SingleNum{
    (num:number):number
}

const add2:SingleNum = (num)=>num+2

//* parameter names (a and b) are just for readability purposes. As long as the types of parameters match, it is a valid type for the function.
const addTwoNums : (a:number, b:number)=>number = (x,y)=>{
    return x+y;
}

//* Contextual Typing 
const add3 = (num:number):number=>num+3

//* optional & Default parameters
const greetMe = (name:string="Sarah", greet?:"Hello" | "Welcome" | "Good Day"): string => greet ? `${greet} ${name}` : `Hey ${name}` 

//* rest parameters
const getItem = (itemName:string, ...itemDetails:[number, boolean, boolean]):Item => {
    const [itemNo, premium, homeDelivery] = itemDetails
    
    return {
        itemName,
        itemNo,
        premium,
        homeDelivery
    }
}

add3(6);
console.log(getItem("Tennis Ball", 1264, true, true))
addTwoNums(12, 12)
printName("Sarah");
add2(24);
startsWithS("sandra");