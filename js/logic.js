let beer; //Variable donde almacenaremos el estilo de cerveza
let toBuy = true; //Variable que determinara si se sigue o no agregando al carrito
let container; //Variable que guarda el tipo de envase seleccionado
let amount; //Variable que guarda la cantidad de unidades que se piden
let liters; //Variable que guarda la medida de barril seleccionado (20, 30 o 50lts)
let question; //Esta variable contendrá la respuesta de si quiere o no seguir agregando al carrito

const trolley = []; //Esta lista contendrá todos los productos que se agreguen al carrito

let congratulation = document.createElement("div"); //Creamos un elemento mediante el DOM donde podemos registrar que la compra se a realizado con exito y el precio total con la fecha de compra
congratulation.className = "mx-auto text-center text-success"; //Definimos las clases de el elemento creado
document.body.append(congratulation); //Agregamos el elemento creado a su Padre

let listProducts = document.createElement("div"); //Creamos un div con el DOM para mostrar los productos comprados
listProducts.className = "mx-auto text-center text-dark"; //Le agregamos las clases al elemento creado
document.body.append(listProducts); //Agregamos la lista de productos como hijo del body

//Creamos una clase constructora donde pasamos como propiedades el precio de cata medida de cerveza y su stock
class BeerPrice {
    constructor(price500ml, price20lts, price30lts, price50lts, stock){
        this.bottle500 = price500ml;
        this.barrel20 = price20lts;
        this.barrel30 = price30lts;
        this.barrel50 = price50lts;
        this.stock = stock
    }
}

//Creamos los objetos de cada tipo de cerveza con sus respectivos precios y stock
const scottish = new BeerPrice(2932,4000,5900,9800,500);
const golden = new BeerPrice(2808,3200,5900,7800,500);
const doradaPampeana = new BeerPrice(2652,3100,4600,7650,500);
const porter = new BeerPrice(2932,4300,5900,10600,500);
const ipa = new BeerPrice(3026,5000,7400,12300,500);

//Bucle donde pediremos al usuario que seleccione la cerveza a comprar y en base a esta se ejecutaran las funciones correspondientes hasta que el usuario decida terminar el ciclo
// do{
//     beer = prompt("Indícanos que cerveza deseas adquirir:\nScottish | Golden | Dorada Pampeana | Porter | Ipa").toUpperCase();
//     switch(beer){
//         case "SCOTTISH":
//             beerContainer(scottish);
//             nextPurchase();
//             break;
//         case "GOLDEN":
//             beerContainer(golden);
//             nextPurchase();
//             break;
//         case "DORADA PAMPEANA":
//             beerContainer(doradaPampeana);
//             nextPurchase();
//             break;
//         case "PORTER":
//             beerContainer(porter);
//             nextPurchase();
//             break;
//         case "IPA":
//             beerContainer(ipa);
//             nextPurchase();
//             break;
//         default:
//             alert("Esta cerveza no forma parte de nuestro catalogo");
//             break;
//     }
// }while(toBuy);

function beerContainer(howBeer){
    container = prompt("Indíquenos el envase que desea:\nBOTELLA | BARRIL").toUpperCase();//Botella o Barril
    if (container == "BOTELLA" || container == "BOTELLAS"){
        amount = parseInt(prompt("🍻Las botellas se encargan en packs de 12 botellas\nCuantos packs desea adquirir?"));//cantidad de packs(botellas)
        howBeer.stock-=amount/2;
        trolley.push({style:beer,priceBeer:howBeer.bottle500*amount,stock:howBeer.stock});
        alert("Usted a encargado "+amount*12+" botellas de "+beer+" equivalentes a "+ amount/2 +"lts\nPRECIO: $"+ howBeer.bottle500*amount);
    }
    else if (container == "BARRIL" || container == "BARRILES"){
        liters = parseInt(prompt("🍻Elija uno de los barriles de nuestro catalogo:\n20lts | 30lts | 50lts\nSOLO INDIQUE EL NUMERO NO LA UNIDAD"));//cual barril?
        amount = parseInt(prompt("Cuantos barriles de "+liters+"lts deseas?"));//cuantos barriles?
        switch(liters){
            case 20:
                howBeer.stock-=amount*20;
                trolley.push({style:beer,priceBeer:howBeer.barrel20*amount,stock:howBeer.stock});
                alert("Usted a encargado "+amount+" barril/es de "+beer+" equivalentes a "+ amount*20 +"lts\nPRECIO: $"+ howBeer.barrel20*amount);
                break;
            case 30:
                howBeer.stock-=amount*30;
                trolley.push({style:beer,priceBeer:howBeer.barrel30*amount,stock:howBeer.stock});
                alert("Usted a encargado "+amount+" barril/es de "+beer+" equivalentes a "+ amount*30 +"lts\nPRECIO: $"+ howBeer.barrel30*amount);
                break;
            case 50:
                howBeer.stock-=amount*50;
                trolley.push({style:beer,priceBeer:howBeer.barrel30*amount,stock:howBeer.stock});
                alert("Usted a encargado "+amount+" barril/es de "+beer+" equivalentes a "+ amount*50 +"lts\nPRECIO: $"+ howBeer.barrel50*amount);
                break;
            default:
                alert("No es valida esta unidad de medida.\nRecuerde que solo tenemos de 20,30 y 50lts y\nque no se debe incluir la unidad lts, solo el numero")
        }
    }
    else{alert("El envase solicitado no figura en nuestro catalogo")}
}

function nextPurchase(){
    do{
        question = prompt("Desea seguir agregando al carrito?\nSI | NO").toUpperCase();
        if (question == "SI"){
            toBuy = true;
        }
        else if(question == "NO"){
            toBuy = false;
        }
        else{alert("La respuesta ingresada no es valida.Vuelve a intentarlo")}
    }while(question != "SI" && question != "NO") //Mientras la respuesta sea distinta de NO o de SI el bucle seguirá consultando por la compra
}

const noStock = trolley.filter((stockValidation)=>stockValidation.stock<0);//Utilizamos filter() para colocar en el array noStock todas las cervezas que quedaron en stock negativo
//Utilizamos forEach() para mostrar por consola cuales son las cervezas que el vendedor tendrá que reponer para cubrir la demanda
console.log("Reponer Stock de:");
noStock.forEach((noStockList)=>{console.table(noStockList)}
);
const total = trolley.reduce((acumulador,priceBeer)=>acumulador + priceBeer.priceBeer,0); //Utilizamos un reduce() para calcular el total de la compra
const day = new Date;
// alert("Costo total de: $"+total+"\nSu compra se realizo con éxito hoy: "+ day.toLocaleDateString()); //en el parte del total de la compra incluimos la fecha en que se realizo
// congratulation.innerHTML=`
//     <div class="bg-white mx-auto" style="width:max-content">
//         <b class="fs-4">Felicidades, su compra se ha realizado con éxito.</b><br>
//         <p>Costo total: $${total}</p><br>
//         <p>Fecha de la compra: ${day.toLocaleDateString()}</p><br>
//     </div>`;

// listProducts.innerHTML = `<b class="bg-dark text-white" style="width:max-content">LISTA DE PRODUCTOS</b>`;
// for (let buyReady of trolley){
//     listProducts.innerHTML+=`<p class="bg-white mx-auto text-center" style="width:max-content"><b>${buyReady.style}</b> = ${buyReady.priceBeer}</p><br>`
// }

//CREAMOS MEDIANTE EL DOM 4 CARDS QUE REPRESENTAN LOS 4 TIPOS DE CONTAINER QUE LA EMPRESA OFRECE
//El Plan es luego mediante eventos, al hacer click en uno de ellos, abrir un formulario y que la compra se agregue al carrito

let body = document.getElementsByTagName("body");
let products = document.createElement("div");
const allProducts = [["Botella 500cc","bottle500.jpeg","btn500cc"],["Barril 20lts","barrel20.jpeg","btn20lts"],["Barril 30lts","barrel30.jpeg","btn30lts"],["Barril 50lts","barrel50.jpeg","btn50lts"]];
products.className = "d-flex flex-row justify-content-evenly m-3";
for(const pro of allProducts){
    products.innerHTML+=`
    <div class="card" style="width: 18rem;">
    <img src="../assets/img/container/${pro[1]}" class="card-img-top" alt="${pro[0]}">
    <div class="card-body d-flex flex-column align-items-center">
      <h5 class="card-title">${pro[0]}</h5>
      <a href="#formBuy" class="btn btn-primary" id="${pro[2]}">QUIERO!</a> 
    </div>
  </div>`;//Agregamos un ID a cada btn para poder trabajar los eventos de cada uno
}
document.body.append(products);

//SELECCIONAMOS CADA BOTON POR SU ID PARA PODER ESCUCHARLOS DE MANERA PERSONALIZADA
let btn500cc = document.getElementById("btn500cc");
let btn20lts = document.getElementById("btn20lts");
let btn30lts = document.getElementById("btn30lts");
let btn50lts = document.getElementById("btn50lts");

//Creamos un elemento buyForm donde almacenaremos un formulario de compra para cada vez que querramos agregar algo al carrito luego de seleccionar el envase que querramos adquirir
let buyForm = document.createElement("div");
document.body.append(buyForm);

//function que crea un formulario de compra
function purchaseForm(howContainer){
    buyForm.innerHTML=`
    <div >
        <form action="" id="formBuy" class="bg-secondary d-flex flex-column align-items-center p-5 w-50 mb-5 border border-3 border-light rounded-3 mx-auto" style="position:fixed; top:30%; left:25%">
        <h2>${howContainer}</h2>
        <div class="d-flex justify-content-evenly m-3 p-5">
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="scottish">
            <label class="form-check-label" for="inlineRadio1">SCOTTISH</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="golden">
            <label class="form-check-label" for="inlineRadio2">GOLDEN</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="doradaPampeana">
            <label class="form-check-label" for="inlineRadio3">DORADA PAMPEANA</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="porter">
            <label class="form-check-label" for="inlineRadio4">PORTER</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="ipa">
            <label class="form-check-label" for="inlineRadio5">IPA</label>
        </div>
        </div>
        <div class="m-4">
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">N°</span>
            <input type="number" id="cantidadDeUnidades" class="form-control w-20" placeholder="Cantidad de unidades" aria-label="cantidad" aria-describedby="basic-addon1">
        </div>
        </div>
        <button type="submit" class="btn btn-primary w-20">Al Carrito</button>
        </form>
    </div>
    `
}


//Seleccionamos cada boton para ejecutar un evento
btn500cc.onclick = () =>{products.setAttribute("style","filter:blur(5px);transition:1s");
                        purchaseForm("Packs x 12 Botellas de 500cc");}
btn20lts.onclick = () =>{products.setAttribute("style","filter:blur(5px);transition:1s");
                        purchaseForm("Barriles 20lts")};
btn30lts.onclick = () =>{products.setAttribute("style","filter:blur(5px);transition:1s");
                        purchaseForm("Barriles 30lts")};
btn50lts.onclick = () =>{products.setAttribute("style","filter:blur(5px);transition:1s");
                        purchaseForm("Barriles 50lts")};

//Creamos un almacenador de productos agregados al Carrito
let cartStorage = document.createElement("div");
document.body.append(cartStorage);

let cantidad = document.getElementById("cantidadDeUnidades");
cantidad.addEventListener('keyup',(e)=>{
    let count=console.log(e.path[0].value);
    cartStorage.innerHTML=count
})