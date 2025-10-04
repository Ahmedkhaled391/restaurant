let products = document.querySelectorAll(`#Add`);
let cart = document.querySelector(`.cart`);
let cartList = document.querySelector(`.cartList`)

if(localStorage.getItem("counter") == null){
    localStorage.setItem("counter",0);
}

// add to localStorage
products.forEach(product=>{
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
cart.addEventListener("click",e => {
    e.preventDefault();

    if(!cartList.classList.contains("d-none")){
        return undefined;
    }

    cartList.classList.remove("d-none");
    let total = 0;

    for (const key in localStorage) {
        
        if(!isNaN(key)){
            let obj = JSON.parse(localStorage[key]);

            total += +obj.price.split("$")[1];

            addToCartView(obj,key);
        }

    }

    let totalTag = document.createElement("div");
    totalTag.className = "text-nowrap text-center fs-5";

    totalTag.append(`Total : $${total}`);
    cartList.append(totalTag);

    // delete product
    let del = document.querySelectorAll(`.delbtn`);
    del.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            localStorage.removeItem(btn.parentElement.id);
            
            let discount = +btn.parentElement.innerText.split("\n")[0].split(":")[1].split("$")[1];
            
            total -= discount;
            totalTag.innerText = "";
            totalTag.append(`Total : $${total}`);
            cartList.append(totalTag);

            btn.parentElement.nextElementSibling.remove();
            btn.parentElement.remove();
            
            localStorage["counter"] -= 1;
        });
    })
});

// but data in suitable tags
function addToCartView(data,id){
    let div = document.createElement("div");
    div.className = "text-nowrap fs-5 d-flex justify-content-between gap-2 align-items-center"
    div.id = id;

    let delBtn = document.createElement("a");
    delBtn.className= "btn btn-danger delbtn";
    delBtn.append("Delete")

    div.append(`${data.name} : ${data.price}`,delBtn)

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