


if(JSON.parse(localStorage.getItem("cart"))==null){

    localStorage.setItem("cart",JSON.stringify([]))
    
}

let cart = JSON.parse(localStorage.getItem("cart"))

console.log(cart)

function addToCart(productId){
    let isIdExist = false
    cart.map(p=>{
        if(Number(p.id) == Number(productId)){
            
            increaseQuantity(p.id)
            isIdExist=true
            
        }
        

    })


    if(!isIdExist){

        let product  = {id:productId,quantity:1}
        cart = [...cart,product]

    }



   
    Toast.success("Ürün Sepete Eklendi")
    
    updateLocalStorage()
}


function removeFromCart(productId){
    cart =cart.filter(c=>{
        return Number(c.id)!==Number(productId)
    })
    Toast.error("Ürün Sepetten Kaldırıldı")
    updateLocalStorage()
    renderProducts()
}


function updateLocalStorage(){

    localStorage.setItem("cart",JSON.stringify(cart))
    
}


function increaseQuantity(productId){


    cart.map(p=>{
        if(Number(p.id) == Number(productId)){
            p.quantity+=1
        }
    })
    updateLocalStorage()
    renderProducts()

}


function decreaseQuantity(productId){

    cart.map(p=>{
        if(Number(p.id) == Number(productId)){
            p.quantity-=1
            if(p.quantity<=0){
                removeFromCart(p.id)
            }
        }
    })
    updateLocalStorage()
    renderProducts()
}



function renderProducts(){
    let productsWrapper = $("#productsInCart")
    productsWrapper.text("")
    let totalPrice =0;


    cart.map(p=>{

        let currentProduct = getProductById(p.id)
        totalPrice+=currentProduct.price*p.quantity
        
        let productElement = $(`
                                    <div class="row mt-3 border " style="height:100px;">
                                                    
                                        <div class="col-2 p-0 d-flex align-items-center  productImage_wrapper">
                                            <img src="../assets/img/images${currentProduct.img_url}.jpg" style="width:100%;height:auto;object-fit:cover;"/>
                                        </div>
                                
                                        <div class="col-6  d-flex flex-column justify-content-center">
                                            <b class="col-12 ">${currentProduct.brandName} ${currentProduct.name}  </b>
                                            <span class="col-12 ">${currentProduct.color}   </span>

                                        </div>
                                        <div class="col-4  d-flex flex-column justify-content-center">
                                            <div class="row">
                                                <div class="col-12 ">
                                                    <div class="row ">
                                                    <div class="col-8">
                                                        <div class="row">
                                                            <div class="col-3 p-0 d-flex justify-content-center">
                                                                <a class="btn btn-primary" onclick="decreaseQuantity(${p.id})">-</a>
                                                            </div>
                                                            <div class="col-6 p-0">
                                                                <input type="text" class="form-control" id="product-quantity-${p.id}" value="${p.quantity}" readonly>
                                                            </div>
                                                            <div class="col-3 p-0  d-flex justify-content-center">
                                                                <a class="btn btn-primary " onclick="increaseQuantity(${p.id})" >+</a>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div class="col-4 d-flex align-items-center justify-content-center">
                                                        <a class="btn btn-danger" onclick="removeFromCart(${p.id})">
                                                            <i class="fas fa-trash"></i>
                                                        </a>
                                                        
                                                    </div>

                                                    <div class="col-12 d-flex justify-content-center align-items-center mt-2">
                                                    ${numberToPrice(Number(p.quantity) * Number(currentProduct.price))  }
                                                    </div>
                                                   


                                                </div>
                                            </div>
                                        </div>
                                    

                                    </div>

        
        `)
        
        productsWrapper.append(productElement)
    })

    let totalPriceElements = document.getElementsByClassName("totalPrice")
    totalPriceElements.map = Array.prototype.map
    totalPriceElements.map(e=>{
        e.innerHTML=numberToPrice(totalPrice) 
    })
}
