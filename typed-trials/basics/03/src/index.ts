//* Type-Casting
console.log("Script is Active");

let input  = document.getElementById("uname");
// console.log(input.value) //* error: Property 'value' does not exist on type 'HTMLElement'

console.log((input as HTMLInputElement).value)

let inputEl0 = input as HTMLInputElement;
console.log(inputEl0.value)

let inputEl1  = document.getElementById("uname") as HTMLInputElement;
console.log(inputEl1)
console.log(inputEl1.value)


let inputEl2 = <HTMLInputElement> document.getElementById("uname");
console.log(inputEl2)
console.log(inputEl2.value);

