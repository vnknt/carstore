class Toast{

    static createToast(message,classList){

        let toastWrapper = document.createElement("div")
        toastWrapper.classList.add("customToast")
        toastWrapper.classList.add([...classList])
        let toastMsg = document.createElement("p")
        toastMsg.innerHTML=message
        let toasts = document.querySelectorAll(".customToast")
        
        toasts.map = Array.prototype.map
        toasts.map(t=>{
            t.style.bottom = `${ window.innerHeight- t.offsetTop +50 }px`
        })
        toastWrapper.appendChild(toastMsg)
        document.body.appendChild(toastWrapper)
        setTimeout(function(){

            toastWrapper.classList.add("toast-hidden")
            setTimeout(function(){
                toastWrapper.remove()
            },500)
                
        },2500)

    }

    static success(msg){

        
        this.createToast(msg,["customToast-success"])
        

    }

    static error(msg){

        
        this.createToast(msg,["customToast-error"])
        

    }



}