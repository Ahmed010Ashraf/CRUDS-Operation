let name = document.getElementById("name")
let price = document.getElementById("price")
let tax = document.getElementById("tax")
let count = document.getElementById("count")
let catigory = document.getElementById("catigory")
let btnAddProduct = document.getElementById("add")
    
    let mode = "add";
    let temp ;
    let deleteButton = document.querySelector(".delete-all");

// check localstorage
let arr;
    if(localStorage.getItem("arr")){
        arr = JSON.parse(localStorage.getItem("arr"))
    }
    else {
        arr = [];
    }

    // get data

btnAddProduct.addEventListener("click", ()=>{
    let newproduct = {
        name : name.value,
        price : price.value,
        tax : tax.value,
        catigory : catigory.value,
        total : price.value - tax.value,
    }
    if(validateData()){
        if(mode == "add"){
            if(count.value > 1){
                for(let i = 0; i < count.value ; i++){
                    arr.push(newproduct)
                }
            }else {
                arr.push(newproduct)
            }
            localStorage.setItem("arr" , JSON.stringify(arr))
            // console.log(arr);
        }
        else {
            arr[temp] = newproduct
            localStorage.setItem("arr" , JSON.stringify(arr))
            count.style.display = "block"
        btnAddProduct.innerHTML = "add product"
            displaydata()
            mode="add"
        }
        displaydata()
        clear()
    }
    
 
})



// clear inputs 
function clear(){
    name.value = ""
    price.value = ""
    tax.value = ""
    count.value = ""
    catigory.value = ""
}


// displaydata 

let displaydata = ()=>{
    let products = "" ;
    arr.forEach((item , idx) => {
        products += `
                    <tr>
                    <td>${idx + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.tax}</td>
                    <td>${item.total}</td>
                    <td>${item.catigory}</td>
                    <td><button onClick="deleteme(${idx})" class="btn btn-danger">delete</button></td>
                    <td><button onClick="update(${idx})" class="btn btn-info">update</button></td>
                    </tr>
        `
    });

    document.querySelector("#product-container").innerHTML = products

    // check the arr length to add the button delete all

    if(arr.length > 0){
        deleteButton.innerHTML = `<button class="btn btn-success w-100 mb-2">delete all</button>`
    }else {
        deleteButton.innerHTML = ""
    
    }
}
displaydata()

// delete one element 
function deleteme(idx){
arr.splice(idx , 1);
localStorage.setItem("arr", JSON.stringify(arr))
displaydata()
}

// update 
function update(idx){
    name.value = arr[idx].name;
    price.value = arr[idx].price;
    tax.value = arr[idx].tax;
    catigory.value = arr[idx].catigory;
    count.style.display = "none"
    btnAddProduct.innerHTML = "update product"
    mode = "update"
    temp = idx
}

// validate the data 
function validateData(){
    if(name.value.length == 0 || name.value.length > 20){
        document.querySelector(".alert-name").style.display = "block"
        return false
    }
    else {
        document.querySelector(".alert-name").style.display = "none"
    }
    if(!/^\d+$/.test(price.value) || price.value.length > 20 || price.value.length==0){
        document.querySelector(".alert-price").style.display = "block"
        return false
    }else {
        document.querySelector(".alert-price").style.display = "none"
    }
    if(!/^\d+$/.test(tax.value) || tax.value.length > 20 || tax.value.length==0){
        document.querySelector(".alert-tax").style.display = "block"
        return false
    }else {
        document.querySelector(".alert-tax").style.display = "none"
    }
    if(window.getComputedStyle(count).getPropertyValue('display')=="block"){
        if(!/^\d+$/.test(count.value) || count.value.length > 20 || count.value.length==0){
            document.querySelector(".alert-count").style.display = "block"
            return false
        }else {
            document.querySelector(".alert-count").style.display = "none"
        }
    }
    if(catigory.value.length == 0 || catigory.value.length > 20){
        document.querySelector(".alert-catigory").style.display = "block"
        return false
    }else {
        document.querySelector(".alert-catigory").style.display = "none"
    }
    return true
}


// search 

let flag = "name"
let byname = document.querySelector("#searchByName")
let bycatigory = document.querySelector("#searchByCatigory")
let searchinput = document.querySelector("#search")
// console.log(searchinput);

byname.onclick = function(){
    flag = "name"
    searchinput.placeholder = "search by name"
    searchinput.value = ""
    displaydata()
    searchinput.focus()
}
bycatigory.onclick = function(){
    flag = "catigory"
    searchinput.placeholder = "search by catigory"
    searchinput.value = ""
    displaydata()
    searchinput.focus()
}

searchinput.addEventListener("keyup" , (e)=>{
    // console.log(e.target);
    
    search(e.target.value)
})

function search(val) {
    let products = "";

    for (let i = 0; i < arr.length; i++) {
        if (flag === "name") {
            // Search by name
            if (arr[i].name.toLowerCase().includes(val.toLowerCase())) { 
                products += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${arr[i].name}</td>
                        <td>${arr[i].price}</td>
                        <td>${arr[i].tax}</td>
                        <td>${arr[i].total}</td>
                        <td>${arr[i].catigory}</td>
                        <td><button onClick="deleteme(${i})" class="btn btn-danger">delete</button></td>
                        <td><button onClick="update(${i})" class="btn btn-info">update</button></td>
                    </tr>
                `;
            }
        } else {
            // Search by category
            if (arr[i].catigory.toLowerCase().includes(val.toLowerCase())) { 
                products += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${arr[i].name}</td>
                        <td>${arr[i].price}</td>
                        <td>${arr[i].tax}</td>
                        <td>${arr[i].total}</td>
                        <td>${arr[i].catigory}</td>
                        <td><button onClick="deleteme(${i})" class="btn btn-danger">delete</button></td>
                        <td><button onClick="update(${i})" class="btn btn-info">update</button></td>
                    </tr>
                `;
            }
        }
    }

    
    if (products === "") {
        products = `
            <tr>
                <td colspan="8">No products found</td>
            </tr>
        `;
    }

    document.querySelector("#product-container").innerHTML = products;
}



// delete all 
function deleteAll() {
    arr=[];
    localStorage.removeItem("arr")
    displaydata()
}

document.querySelector(".delete-all").onclick = function(){
    deleteAll();
}