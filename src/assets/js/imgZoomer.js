let zoomImage = document.querySelectorAll(".imgZoom")

zoomImage.map = Array.prototype.map

let productImage = document.getElementById("productImage")
let canvas = document.getElementById("imgZoomedPart");
let imgCropDiv = document.getElementById("imgZoomerDiv")

zoomImage.map(i=>{


    i.addEventListener("mousemove",function(e){

         let img = new Image()

         img.src=productImage.getAttribute('src')

        let imgRate = img.naturalWidth  / productImage.offsetWidth

        console.log(imgRate)

        let imgWidth = productImage.offsetWidth
        let imgHeight = productImage.offsetHeight

        let contex = canvas.getContext("2d");

        if(imgCropDiv==undefined){

            imgCropDiv = document.createElement("div")
            imgCropDiv.setAttribute("id","imgZoomerDiv")
       
        }

        
        
        if( e.clientX  >  productImage.offsetLeft + imgWidth  ||  e.clientX <productImage.offsetLeft ||
            e.clientY  >  productImage.offsetTop + imgHeight   ||  e.clientY < productImage.offsetTop
            
            ){

            imgCropDiv.remove()
            canvas.style.display="none"
            return
        }else{
            canvas.style.display="block"
        }
        
        contex.fillStyle = "white";

        contex.fillRect(0, 0, canvas.width, canvas.height);

        contex.drawImage(productImage, (e.clientX-i.offsetLeft-50)*imgRate, (e.clientY-i.offsetTop-50)*imgRate, 
            100*imgRate, 100*imgRate,0,0,300,300);

        imgCropDiv.style.position="fixed"
        imgCropDiv.classList.add("imgCrop")

        imgCropDiv.style.top=`${e.clientY-50}px`
        imgCropDiv.style.left=`${e.clientX-50}px`
        i.appendChild(imgCropDiv)


        
        $(window).on('mousewheel ', function(event){
            if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                console.log("a")
            }
            else {
                console.log("a")
            }
        });

    })

    i.addEventListener("mouseleave",function(e){
        canvas.style.display="none"
        imgCropDiv.remove()
    })


})



