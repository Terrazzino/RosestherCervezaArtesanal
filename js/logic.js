class BeerPrice{
    constructor(pack6, pack12, lts20, lts30, lts50, image){
        this.pack6 = pack6;
        this.pack12 = pack12;
        this.lts20 = lts20;
        this.lts30 = lts30;
        this.lts50 = lts50;
        this.image = image
    }
}
//PRECIOS EN DOLAR PARA MANTENER LOS PRECIOS ACTUALIZADOS EN RELACIÓN A LA API
const doradaPampeana = new BeerPrice(5.86,11.72,15.73,22.83,38.06,"../assets/img/shop/1.jpg");
const golden = new BeerPrice(6.15,12.31,16.31,23.68,39.47,"../assets/img/shop/2.jpg");
const scottish = new BeerPrice(6.48,12.96,17.36,25.20,42.01,"../assets/img/shop/3.jpg");
const porter = new BeerPrice(6.48,12.96,17.36,25.20,42.01,"../assets/img/shop/4.jpg");
const ipa = new BeerPrice(6.62,13.31,18.87,27.40,45.67,"../assets/img/shop/5.jpg");
const cerveza = {doradaPampeana:doradaPampeana,golden:golden,scottish:scottish,porter:porter,ipa:ipa};

//Guardamos el valor del dolar actual en la variable dolar
let dolar;

//Utilizamos Luxon para avisar que 7 dias despues de la compra del producto llegara el producto
const DateTime = luxon.DateTime;
let today = DateTime.now();
let deliveryDay = today.plus({ days: 7 }).toISODate();



//Seleccionamos el body para utilizarlo con el DOM
let body = document.getElementsByTagName("body");

//Creamos una tabla de compras
let tableTitle = document.createElement("table");
tableTitle.setAttribute("style","background:#8F8F8F; color:black; margin:auto; margin-bottom:2em; border-radius:5px")
document.body.appendChild(tableTitle);
tableTitle.innerHTML=`
    <tr>
        <th class="px-3">Estilo</th>
        <th class="px-3">Envase</th>
        <th class="px-3">Cantidad</th>
        <th class="px-3">Precio</th>
        <th class="px-3">Precio Total</th>
        <th class="px-3">Agregar</th>
    </tr>
    <tr>
        <td class="px-3">
            <div class="col-md">
                <select class="form-select" id="styleBeer">
                    <option value = "inicio" selected>------</option>
                    <option value="doradaPampeana">Dorada Pampeana</option>
                    <option value="golden">Golden</option>
                    <option value="scottish">Scottish</option>
                    <option value="porter">Porter</option>
                    <option value="ipa">Ipa</option>
                </select>
            </div>
        </td>
        <td class="px-3">
            <div class="col-md">
                <select class="form-select" id="containerBeer">
                    <option value = "inicio" selected>------</option>
                    <option value="pack6">Pack de 6 Botellas de 500cc</option>
                    <option value="pack12">Pack de 12 Botellas de 500cc</option>
                    <option value="lts20">Barril de 20lts</option>
                    <option value="lts30">Barril de 30lts</option>
                    <option value="lts50">Barril de 50lts</option>
                </select>
            </div>
        </td>
        <td class="px-3"><input type="number" value="1" min="1" id="unidades"></td>
        <td class="px-3" id="precio"></td>
        <td class="px-3" id="precioTotal"></td>
        <td class="px-3"><button type="button" class="btn btn-success agregar" id="btn-agregar">👍</button></td> 
    </tr>
`;

    let agregar = document.getElementById("btn-agregar");
    let styleBeer = document.getElementById("styleBeer");
    let amount = document.getElementById("unidades");
    let totalPrice = document.getElementById("precioTotal")
    let price = document.getElementById("precio");
    let containerBeer = document.getElementById("containerBeer");
    agregar.setAttribute("disabled","true");
    containerBeer.setAttribute("disabled","true");
    amount.setAttribute("disabled","true");
    let styleBeerVal;
    let containerBeerVal;
    let styleBeerValue;
    let containerBeerValue;
    let cantidad=1;
    let imageBeer;
    let total = [];

let sumador = 0;
let precioEnPantalla = document.createElement("div");
document.body.append(precioEnPantalla);

//Creamos un almacenador del carrito
let trolley = document.createElement("div");
trolley.className ="container text-center";
let divTrolley = document.createElement("div");
divTrolley.className="row";
document.body.append(trolley);
trolley.append(divTrolley);
const listTrolley = [];


//FUNCION PARA BORRAR ELEMENTOS DEL CARRITO
let borrar = (index)=>{
    sumador=0;
    listTrolley.splice(index,1);
    divTrolley.innerHTML=``;
    listTrolley.forEach((agregar,index)=>divTrolley.innerHTML+=`
    <div class="card col-4 mb-3" style="width: 18rem;">
    <img src="${agregar.img}" class="card-img-top" alt="...">
        <div class=" card-body">
            <h5 class="card-title">${agregar.estilo}</h5>
            <p class="card-text">${agregar.envase}</p>
            <button type="button" class="btn btn-danger borrar" onclick="borrar(${index})">QUITAR</button>
        </div>
 </div>`); 
 total.splice(index,1);
 for (let i=0; i<total.length ; i++){
    sumador -= total[i].precioTotal;
};

//TERNARIO aplicado para que el resultado total al quitar elementos no sea negativo; encontre el problema de que la resta se realiza correctamente pero por alguna razon me colocaba un signo menos adelante del numero, y asi lo solucione
sumador<0?sumador=sumador*-1:sumador=sumador;


//PRESENTACION EN PANTALLA DEL PRECIO TOTAL DE COMPRA
precioFinal.innerHTML=`$${sumador}`;
precioEnPantalla.innerHTML=`
<h3 class="text-center text-white">PRECIO TOTAL</h3>
<h4 class="text-center text-success">$${sumador}</h4>
`;
sumador<=0?botonCompra.setAttribute("disabled","true"):botonCompra.removeAttribute("disabled")
}

//AGREGAR PRODUCTOS AL CARRITO
agregar.onclick = () =>{
    botonCompra.removeAttribute("disabled");
    sumador=0;
    listTrolley.push({estilo:styleBeerVal,envase:containerBeerVal,img:imageBeer});
    divTrolley.innerHTML=``;
    listTrolley.forEach((agregar,index)=>divTrolley.innerHTML+=`
    <div class="card col-4 m-3" style="width: 18rem;">
    <img src="${agregar.img}" class="card-img-top" alt="...">
        <div class=" card-body">
            <h5 class="card-title">${agregar.estilo}</h5>
            <p class="card-text">${agregar.envase}</p>
            <button type="button" class="btn btn-danger borrar" onclick="borrar(${index})"">QUITAR</button>
        </div>
 </div>`); 
 total.push({estilo:styleBeerVal,envase:containerBeerVal,cantidadElegida:cantidad,precioTotal:cerveza[styleBeerValue][containerBeerValue]*amount.value*dolar});

for (let i=0; i<total.length ; i++){
    sumador += total[i].precioTotal;
};
precioFinal.innerHTML=`$${sumador.toFixed(2)}`;
precioEnPantalla.innerHTML=`
<h3 class="text-center text-white">PRECIO TOTAL</h3>
<h4 class="text-center text-success">$${sumador.toFixed(2)}</h4>
`
};

//Formulario obligatorio para comprar los productos
let formBuy = document.createElement("div");
document.body.append(formBuy);
formBuy.innerHTML=`
<div class="d-grid gap-2 col-2 mx-auto mb-4">
    <button type="button" class="btn btn-success" id="botonCompra" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">REALIZAR MI COMPRA</button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Necesitamos solo algunos datos</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="formCompras" onsubmit="return false">
                        <div class="mb-3">
                            <label for="exampleInputText1" class="form-label">Nombre y Apellido</label>
                            <input type="text" class="form-control" id="exampleInputText1">
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="E-mail" aria-label="Recipient's username" aria-describedby="basic-addon2" id="exampleInputEmail1">
                            <span class="input-group-text" id="basic-addon2">@gmail.com</span>
                        </div>
                        <div class="mb-3">
                            <table id="listaCompra">
                                <tr>
                                    <th class="px-3">Estilo</th>
                                    <th class="px-3">Envase</th>
                                    <th class="px-3">Cantidad</th>
                                    <th class="px-3">Precio</th>
                                </tr>
                            </table>
                         </div>
                         <div class="mb-3">
                             <h4 class="text-center">PRECIO TOTAL:</h4>
                             <h3 class="text-center"><b id="precioFinal"></b></h3>
                         </div>
                        <button type="submit" class="btn btn-primary" id="compraFinal">COMPRAR</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Seguir agregando</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>`;

botonCompra.setAttribute("disabled","true");
let formCompras = document.getElementById("formCompras"); 
let inputEmail = document.getElementById("exampleInputEmail1");
let inputName = document.getElementById("exampleInputText1");

botonCompra.onclick = () =>{
    listaCompra.innerHTML=``;
    total.forEach((producto,index)=>listaCompra.innerHTML+=`
    <tr id="${index}">
        <td class="px-3">${producto.estilo}</td>
        <td class="px-3">${producto.envase}</td>
        <td class="px-3">${producto.cantidadElegida}</td>
        <td class="px-3">$${(producto.precioTotal).toFixed(2)}</td>
        <br>
    </tr>
    `);
}
compraFinal.onclick =()=>{
    if(inputName.value!=""&&inputEmail.value!=""){
        localStorage.setItem("fecha",JSON.stringify(new Date));
        localStorage.setItem(`productos`,JSON.stringify(total));
        console.log(localStorage.getItem(`productos`));
          Swal.fire({
            title: 'Felicidades!',
            text: `Su producto llegara aproximadamente el ${deliveryDay[8]+deliveryDay[9]+"/"+deliveryDay[5]+deliveryDay[6]+"/"+deliveryDay[0]+deliveryDay[1]+deliveryDay[2]+deliveryDay[3]}`,
            icon: 'success',
          })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No rellenaste correctamente el formulario obligatorio!'
          })
    }
}


//DENTRO DE LA FUNCION CONVERSOR DOLAR PEDIMOS A UNA API EL VALOR DEL DOLAR ACTUALIZADO PARA CON ESE VALOR MANTENER ACTUALIZADO LOS PRECIOS DE MIS PRODUCTOS
async function conversorDolar(){
    const apiDolar = await fetch("https://api-dolar-argentina.herokuapp.com/api/dolarblue")
    const dolarJson = await apiDolar.json()
    dolar = parseInt(dolarJson.venta).toFixed(2)

    styleBeer.onchange = ()=>{
        price.innerHTML=``;
        totalPrice.innerHTML=``;
        containerBeer.value=`inicio`;
        styleBeerVal = styleBeer.options[styleBeer.selectedIndex].text;
        containerBeer.removeAttribute("disabled");
        agregar.setAttribute("disabled","true");
        amount.setAttribute("disabled","true");
        containerBeer.onchange = ()=>{
            amount.removeAttribute("disabled")
            agregar.removeAttribute("disabled")
            containerBeerVal = containerBeer.options[containerBeer.selectedIndex].text;
            styleBeerValue = styleBeer.value;
            containerBeerValue = containerBeer.value;
            imageBeer =cerveza [styleBeerValue].image;
            price.innerHTML=`$${(cerveza[styleBeerValue][containerBeerValue]*dolar).toFixed(2)}`;
            totalPrice.innerHTML=`$${(cerveza[styleBeerValue][containerBeerValue]*amount.value*dolar).toFixed(2)}`;
        }
    };
    amount.onchange =() =>{
        cantidad=amount.value;
        totalPrice.innerHTML=`$${(cerveza[styleBeerValue][containerBeerValue]*cantidad*dolar).toFixed(2)}`;
    }
}

conversorDolar()