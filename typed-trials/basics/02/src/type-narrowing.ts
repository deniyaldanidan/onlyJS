function amtHandler(amount:number, format:boolean):string|number{
    return format ? `\$${amount}` : amount
}

let amt1 = amtHandler(12, true) as string;
console.log(amt1);

let amt2 = amtHandler(12, false) as number;
console.log(amt2);

let amt3 : string = amtHandler(12, true) as string;
console.log(amt3);