import {faker} from "@faker-js/faker";

const names = []

for (let index = 0; index < 100; index++) {
    names.push(faker.helpers.unique(()=>faker.name.firstName("female")))
}

names.sort()

names.forEach((name)=>{
    console.log(name)
})