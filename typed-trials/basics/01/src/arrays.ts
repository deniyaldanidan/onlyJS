type numArray1  = number[];
type numArray2 = Array<number>;
type stringArray = string[];

type StringNumberArray = (string | number)[]; //* array can contain both strings and numbers
type StringNumberArray2 = Array<number | string>;

type matrix3D = number[][];

type UserArray = User[];

const nums1:numArray1 = [1,2,3];
const nums2:numArray2 = [1,2,3];
const strs1:stringArray = ["a", "b", "c"];

const numstrs1:StringNumberArray = ["apple", "tomato", 12, 34, 56, "banana"];
const numstrs2:StringNumberArray2 = ["watermelon", 45, 8999, "cucumber", "pumpkin", "wild berry", 2022]

const mat1 = [[1,2,3], [4,5,6], [7,8,9]];
const myUsers:UserArray = [
    {
        id: "234",
        name: "anna",
        email: "test@test.com",
        isPaid: true,
        address: {
            flatNumber: 23,
            streetName: "West area",
            cityName: "San Fransisco"
        }
    },
    {
        id: "236",
        name: "sandy",
        email: "sample@test.com",
        isPaid: false,
        level:2,
        address: {
            flatNumber: 12,
            streetName: "South area",
            cityName: "San Fransisco"
        }
    },
    {
        id: "237",
        name: "dave",
        email: "example@test.com",
        isPaid: false,
        level: 4,
        address: {
            flatNumber: 13,
            streetName: "West area",
            cityName: "San Fransisco"
        }
    }
]