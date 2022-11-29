//* The private modifier allows access within the same class.
//* The protected modifier allows access within the same class and subclasses.
//* The public modifier allows access from any location.

class MyPerson{
    private readonly belongsTo:string = "MyPerson"
    constructor (
        protected id:number, 
        protected ssn:string, 
        public fname:string, 
        public lname:string, 
        public readonly birthDate: string,
        protected readonly suffix:string
    ){
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.ssn = ssn;
        this.birthDate = birthDate
    }

    public getFullName():string{
        return `${this.suffix}. ${this.fname} ${this.lname}`
    }

    //* public by default
    mySSN():string{
        return this.ssn
    }

    info():string{
        return `Hi My Name is ${this.getFullName()}. I'm born in ${this.birthDate}.`
    }
}

class MyEmployee extends MyPerson{
    constructor (id:number, ssn:string, fname:string, lname:string, birthDate:string, suffix:string, private jobTitle:string){
        super(id, ssn, fname, lname, birthDate, suffix);
        this.jobTitle = jobTitle;
    }

    empJobStatus():string{
        //* hence belongsTo is private it can only be accessend in MyPerson class 
        // this.belongsTo
        return `${this.getFullName()} is currently working as ${this.jobTitle}`
    }

    //* Method Overriding
    info(): string {
        return super.info() + ` I'm a ${this.jobTitle}`
    }
}

//* Static properties and methods are shared by all instances of a class.
class Order{
    private static orderCount:number = 0;

    constructor(public itemName:string, public orderedUserId:number){
        this.itemName = itemName;
        this.orderedUserId = orderedUserId
        Order.orderCount++
    }

    public static getOrderCount():number{
        return this.orderCount
    }
}

const order1 = new Order("pencil", 12);
const order2 = new Order("basket", 76);
const order3 = new Order("bread", 43);

console.log(Order.getOrderCount());

interface Mail{
    username:string
    send(mail:string):string
    receive(mail:string):string
}

class MyMail implements Mail{
    constructor (public username:string){
        this.username = username
    }

    send(mail: string){
        return `${mail} is send to ${this.username}`
    }

    receive(mail: string): string {
        return `${mail} is received from ${this.username}`
    }
}

//* An interface also can extend a class. If the class contains private or protected members, the interface can only be implemented by the class or subclasses of that class. 