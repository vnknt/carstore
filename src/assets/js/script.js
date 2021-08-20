 class Component{
    
    
    
    get(){
        return this.data
    }

    set(data){
        
        this.data=data
        return new Promise((resolve,reject)=>{

            resolve(this.data)
        })

    }

}



let categories  =new Component();
let variants    =new Component();
let brands      =new Component()
let suppliers   =new Component()
let model_years =new Component()

let products    =new Component()
let prices      =new Component()


let currentMinPrice=0;
let  currentMaxPrice=0;


let filterVariables ={} 

 
let jsonData = new Component()


let  getData = new Promise((resolve,reject)=>{
    $.get("https://test-94b75-default-rtdb.firebaseio.com/.json",function(response){
          
        console.log(jsonData)
        jsonData.set(response)
        resolve(response)
    })
});





function getJsonData (){

    getData.then(result=>{


        jsonData=result


    })

}





function setBrands(data){
    brands.set(data.BRANDS).then(result=>{createBrandObject(result)})
}

function setModelYears(data){

    model_years.set(data.MODELS).then(result=>{createModelYearObject(result)})

}


function setSuppliers(data){

    suppliers.set(data.SUPPLIERS).then(result=>{createSupplierObject(result)})

}

function setCategories(data){

    categories.set(data.CATEGORIES).then(result=>{createCategoryObjects(result)})

}

function setVariants(data){
    variants.set(data.VARIANTS).then(result=>{iterateVariantObjects(result)})
}

function setProducts(data){

    products.set(data).then(result=>{createProductObject(result)})

}

function setPrices(data){
    prices.set(data.PRICE).then(result=>{createPriceObject(result)})
}


function createPriceObject(data){
    currentMinPrice=data.MIN
    currentMaxPrice=data.MAX
    let priceArea = $(`<div id="rangeWrapper">
                            <label>Min Fiyat : <input type="range" name="min" id="minPriceRange" min=${data.MIN} max=${data.MAX} value=${data.MIN} onchange="setPrice(this)"><span id="minPrice"></span></label>
                            <label>Max Fiyat : <input type="range" name="max" id="maxPriceRange" min=${data.MIN} max=${data.MAX} value=${data.MAX} onchange="setPrice(this)"><span id="maxPrice"></span></label>
                      
                        </div>`)    
    $("#filter").append(priceArea)
    
}




function setPrice(e){
  
    document.getElementById(`${e.name}Price`).innerHTML=e.value
    currentMinPrice=Number(document.getElementById("minPriceRange").value)
    currentMaxPrice=Number(document.getElementById("maxPriceRange").value)
    
    filterProducts()


}



function createProductObject(data){

    document.getElementById("products").innerHTML=""


    for(let product of data){

        let product_cart = $(`  <div class="col-4"> 
                                    <div class=" p-5 " >
                                    <div class="img-wrapper">

                                        <img class="card-img-top" src="../assets/img/images${product.img_url}.jpg" alt="Card image cap" width="" height="" style="max-height:10rem" >
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">${getBrandById(product.brand)} ${ product.model}</h5>
                                        <p class="card-text">
                                            Renk: ${getColorById(product.type2)}
                                                </br>
                                            Model: ${getModelYearById(product.model_year)}
                                        </p>
                                        
                                        <a  class="btn btn-primary " href="./detail.html?id=${product.id}" >${numberToPrice(product.price)} TL</a>
                                    </div>
                                </div>



                                </div>
                                `)
        $("#products").append(product_cart)

    }
}

function numberToPrice(number){

    return new Intl.NumberFormat().format(number)
    
}

function createCategoryObjects(data){
    

    for(let item of data){

        let category_link = createLinkElement(href=item.URL , classList=['col-12','category_link'],text=item.NAME)
        let category_element = generateElement('div',["col-12","category_element"])
        let children = document.createElement("ul")

        for(let child of item.CHILDREN){
            let child_link = createLinkElement(href=child.URL , classList=['col-12',"category_link"],child.NAME)
            let li = document.createElement("li")
            child_link.appendChild(li)
            children.appendChild(child_link)
        }

        category_element.appendChild(category_link)
        category_element.appendChild(children)
        mountComponent(category_element,"#filter_categories")
    }   
}

function createBrandObject(data){
    createVariantObjects(data,"brand")
}

function createModelYearObject(data){
    
    createVariantObjects(data,"model_year")
}

function createSupplierObject(data){
    createVariantObjects(data,"supplier")
}

function createPriceRange(data){

}

function generateElement(el_type, classList){

    let el = document.createElement(el_type)
    el.classList.add(...classList)
    return el
    
}


function createVariantObjects(data,title){

    let div = generateElement("div",["col-12" ,"filter","1"])
    let _div = generateElement("div",["col-12", "filter_title"])
    _div2 =generateElement("div",["col-12","variant_block"])
    let span_title = generateElement("span",["col-12"])

    span_title.onclick=(e)=>{
        let block = e.target.closest(".filter").querySelector(".variant_block")
        
        if(block.classList.contains("d-none")){
            block.classList.remove("d-none")

        }else{
            block.classList.add("d-none")
        }
        
    }


    span_title.innerHTML=title
    _div.appendChild(span_title)

    for(const item of data) {
        let checkbox = document.createElement("input")
        let variant_wrapper =generateElement("div",["filter_element","col-12"])
        let span = document.createElement("span")
        
        checkbox.setAttribute("type","checkbox")
        checkbox.setAttribute("data-filter",title.split("_LIST")[0].toLowerCase())
        checkbox.setAttribute("data-value",item.ID)
        checkbox.classList.add("filter-checkbox")

        
        checkbox.addEventListener("change",function(e){

               toggleCheckBox(e)
            })
      




        variant_wrapper.appendChild(checkbox)
        variant_wrapper.appendChild(span)
        
        span.innerHTML=item.NAME
        
        _div2.appendChild(variant_wrapper)
        

    }
    

    
    div.appendChild(_div)
    div.appendChild(_div2)
    mountComponent(div,"#filter")


}

function iterateVariantObjects(data){
    for(const [key,value] of Object.entries(data)){

        if(value.length>0){
            createVariantObjects(value,key)
        }

    }
}


function createLinkElement(href,classList,text=""){
    let a =  document.createElement("a")
    a.setAttribute('href',href)
    a.innerHTML=text
    a.classList.add(...classList)
    return a
}   


function mountComponent(component,selector){
    let nodeList = document.querySelectorAll(selector)
    nodeList.map = Array.prototype.map
    
    nodeList.map(item=>{
        item.appendChild(component)
    })
}



function addFilterVariable(key,value){
    
    if(key in filterVariables ){
        filterVariables[key].push(value)
    }else{
        filterVariables[key] =[value] 
    }
    filterProducts()

        
}



function removeFilterVariable(key,value){

    if(key in filterVariables ){
        

        filterVariables[key]=filterVariables[key].filter(i=>{
           return  i!==value
        })
        
        if(filterVariables[key].length ==0){
            delete filterVariables[key]
        }
    }

    
    generateUrlString()
    filterProducts()
}





function toggleCheckBox(e){
    let dataFilter=e.target.dataset.filter;
    let dataValue=e.target.dataset.value;
    
    if(e.target.checked){   
        
        addFilterVariable(dataFilter, dataValue)

    }else
    {
        removeFilterVariable(dataFilter, dataValue)
    }

    generateUrlString()
    


}


function generateUrlString(){
    let flag=true;
    
    let urlString ="";

    for(const [key,value] of Object.entries(filterVariables) ){


        let params=`${key}=` ;
        value.map(i=>{
            params+=i
            params+="-"
        })
        params=params.slice(0,-1)
        if(flag){
            urlString+=params+"&"
        }
        
        
    }
    //  console.log(urlString.slice(0,-1))
        
}




function filterProducts(){

    let filteredProducts = new Component();
    filteredProducts.set(products.get())
    

    console.log(products.data)
    
    
    filteredProducts.set(
        filteredProducts.data.filter(p=>{
            return p.price>=currentMinPrice && p.price<=currentMaxPrice
        })
        
    ).then((result)=>{createProductObject(result)})


    for(let [key,val] of Object.entries(filterVariables)){

            
            filteredProducts.set(
                
                    filteredProducts.data.filter(p=>{
                        let a=false

                        for(i of val){
                            
                            a= a    ||  p[key] === Number(i) 
                        }

                        return a


                    })
            ).then(result=>{createProductObject(result)})
    }
}


 function getBrandById(id){
  for(i of jsonData.get().FILTER.BRANDS){
      if(Number(i.ID) == Number(id)){
          
          return i.NAME
      }
  }
}

 function getColorById(id){

    for(i of jsonData.get().FILTER.VARIANTS.TYPE2_LIST){
        if(Number(i.ID) === Number(id)){

            return i.NAME
        }
    }

}


 function getSupplierById(id){

    for(i of jsonData.get().FILTER.SUPPLIERS.get()){
        if(Number(i.ID) == Number(id)){

            return i.NAME

        }
    }
  }



   function getModelYearById(id){

    for(i of jsonData.get().FILTER.MODELS){
        if(Number(i.ID) == Number(id)){
            return i.NAME
        }
    }
  }

  function getProductById(id){

    for(let i of jsonData.get().PRODUCTS){
        
        if(Number(i.id) == Number(id)){


            let product = new Product()

            product.brandName=getBrandById(i.brand)
            product.modelYear=getModelYearById(i.model_year)
            product.name=i.model
            product.color = getColorById(i.type2)
            product.img_url=i.img_url
            product.price=i.price
            product.id=i.id
            return product
        }
    }
  }


class Product{
    id=""
    brandName=""
    price=""
    name=""
    modelYear=""
    img_url=""
    color=""
}





