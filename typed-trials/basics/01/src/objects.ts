type flatNo = {flatNumber:number};
type streetName = {streetName:string};
type city = {cityName: string};

//* Intersection types 
type address = flatNo & streetName & city

type User = {
    readonly id: string,
    name: string,
    email: string,
    isPaid: boolean,
    level?: 1 | 2 | 3 | 4,
    address: address
}

const newUser:User = {
    id:"23",
    name: "sandra",
    email: "test@test.com",
    isPaid: true,
    address: {
        flatNumber: 12,
        streetName: "south beach street",
        cityName: "Dubai"
    }
}

newUser.email = "sample@sample.com";
//* below code doesn't work bcuz it is readonly 
// newUser.id = "24";

function addUser (myUser:User):string{
    return `user ${myUser.name} created`
}

function getUser (id:string):User{
    return {...newUser, id:id, level: 2}
}