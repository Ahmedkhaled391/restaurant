let products = document.querySelectorAll(`#Add`);
let cart = document.querySelector(`.cart`);
let cartList = document.querySelector(`.cartList`)

if(localStorage.getItem("counter") == null){
    localStorage.setItem("counter",0);
}

// add to localStorage
products.forEach((product)=>{
    product.addEventListener("click",(e)=>{
        e.preventDefault();

        let name = product.parentElement.innerText.split("\n")[0];
        let price = product.parentElement.parentElement.firstElementChild.innerText;
        
        let obj = {
            "name" : name,
            "price" : price
        }

        let index = localStorage.getItem("counter");

        localStorage.setItem(index,JSON.stringify(obj));

        +index++

        localStorage["counter"] = index;

    })
})

// view on click on cart icon
cart.addEventListener("click",e =>{
    e.preventDefault();

    if(!cartList.classList.contains("d-none")){
        return undefined;
    }

    cartList.classList.remove("d-none");
    let total = 0;

    for(let i =0;i<localStorage.length - 1;i++){
        let obj = JSON.parse(localStorage[i]);

        total += +obj.price.split("$")[1];

        addToCartView(obj);
    }

    let totalTag = document.createElement("div");
    totalTag.className = "text-nowrap text-center fs-5";

    totalTag.append(`Total : $${total}`);
    cartList.append(totalTag)
});

// but data in suitable tags
function addToCartView(data){
    let div = document.createElement("div");
    div.className = "text-nowrap fs-5"

    div.append(`${data.name} : ${data.price}`)

    let hr = document.createElement(`hr`);
    hr.className = "m-2";

    cartList.append(div)
    cartList.append(hr)
}

// close cart on blur
cart.addEventListener("blur",() =>{
    cartList.innerText = ""
    cartList.classList.add("d-none");
})