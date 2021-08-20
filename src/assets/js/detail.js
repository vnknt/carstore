let currentUrl = new URL(window.location);
let productId = currentUrl.searchParams.get("id")


if(productId===null){
    window.location.href="/"
    
}

let car = script.products.filter(p=>{
    return Number(p.id)===Number(productId)
})[0]

if(car.length==0){
    window.location.href="/"
}

console.log(car)

