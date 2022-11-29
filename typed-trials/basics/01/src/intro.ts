// type inference
// typescript will automatically assumes below is a string-type
let greeting = "Hello World";

console.log(greeting);


interface Person{
    readonly id : string,
    name: string,
    age: number,
    gender: "male" | "female",
    country?: string,
}

// Re-opening of interface [adding new properties]
interface Person{
    info(): string,
    greet(name:string):string
}

interface Author extends Person{
    booksWritten: number,
    genre: string,
    totalCopiesSold: number,
    mostSoldBook: string
}

interface Publisher{
    booksPublished: number
}

interface Reader{
    booksReaded : number
}

//* extending multiple interfaces
interface Editor extends Author, Publisher, Reader{
    booksEdited: number
}

interface Item {
    itemName: string;
    itemNo: number;
    premium: boolean;
    homeDelivery:boolean
}