interface Circle{
    type: "circle",
    radius: number
}

interface Square{
    type: "square",
    side: number
}

interface Rect{
    type: "rect",
    length: number,
    width: number
}

// interface Triangle{
//     type: "triangle",
//     sideLength: number
// }


//* if we include Triangle in shape it will produce an error cuz of exhaustive checking [bcuz we didn't include it in our case]
function getArea(shape: Circle | Square | Rect ): number | never{
    switch (shape.type) {
        case "circle":
            return Math.PI * shape.radius ** 2
        case "square":
            return shape.side*2
        case "rect":
            return shape.length * shape.width;
        default:
            const _exhaustiveCheck:never = shape;
            return _exhaustiveCheck
    }
}