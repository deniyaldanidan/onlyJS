abstract class Animal{
    protected abstract sound:string;

    constructor (public legs:1|2|3|4, public hasTail:boolean, public isFriendly:boolean){
        this.legs = legs;
        this.hasTail = hasTail;
        this.isFriendly = isFriendly
    }

    abstract says():string

    generalInfo():string{
        return this.says() + ` It has ${this.legs} legs, ${this.hasTail ? "have" : "doesn't have"} tail and ${this.isFriendly ? "is" : "is not"} friendly`
    }
}

class Dog extends Animal{
    protected readonly sound = "woof";

    says(){
        return `Dog says ${this.sound}.`
    }
}

class Cat extends Animal{
    protected readonly sound = "meow";

    says(){
        return `Cat says ${this.sound}.`
    }
}

const my_dog = new Dog(4, true, true);
const my_cat = new Cat(4, true, true);

console.log(my_dog.generalInfo());
console.log(my_cat.generalInfo());
