interface User {
    readonly id : string,
    name: string,
    age?: number,
    gender?: "male" | "female",
    country?: string,
}

interface Employee extends User{
    salary: number,
    jobTitle: string
}

interface Employer extends User{
    companyName: string
    capital: number
}