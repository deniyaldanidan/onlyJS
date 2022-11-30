function handleInp <T>(a:T):T{
    return a;
}
console.log(handleInp<string>("apple"));

interface Ball{
    ball_price: number,
    ball_type: "Tennis" | "Cricket" | "BaseBall" 
}

interface Milk{
    milk_price: number,
    vegan: boolean,
    fat: "full" | "low"
}

interface Mobile{
    mobile_price: number,
    mobile_type: "Android" | "IOS",
    madeIn: string
}

const ball:Ball = {
    ball_price: 12,
    ball_type: "Tennis"
}

const milk:Milk = {
    milk_price: 34,
    vegan: false,
    fat: "low"
}

const mobile: Mobile = {
    mobile_price: 34000,
    mobile_type: "Android",
    madeIn: "Japan"
}

//* Now you can only supply objects 
function handleObjs<T extends object, U extends object, V extends object>(a:T, b:U, c:V):T&U&V{
    return {...a, ...b, ...c}
}

console.log(handleObjs<Ball, Milk, Mobile>(ball, milk, mobile));

//* for arrow functions 
const getElement:<T>(items:T[], index:number)=>T = (items, i)=>{
    return items[i]
}
//* when using this syntax always provide , 
const getEl = <T,>(items:T[], index:number):T=>{
    return items[index];
}

console.log(getElement<number>([23,45,67], 1))

interface Item<T>{
    id: T,
    getId: ()=>T,
    name: string
}

const item1:Item<number> = {
    id: 234,
    getId: function(){return this.id},
    name: "Ball"
}

const item2:Item<string> = {
    id: "#ffa",
    getId : function(){
        return this.id
    },
    name: "Basket"
}

const myNames:Array<string> = ["Sarah", "Amanda", "Elvis", "Edward", "Rebecca"];

//* Generic Constraints through extends
const getObj = <T, U extends keyof T>(obj:T, key:U)=>{
    return obj[key]
}
//* If the key is not present it will produce an error 
console.log(getObj(milk, "milk_price"));
