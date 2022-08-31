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
const doradaPampeana = new BeerPrice(1560,3120,4185,6075,10125,"../assets/img/shop/1.jpg");
const golden = new BeerPrice(1638,3276,4340,6300,10500,"../assets/img/shop/2.jpg");
const scottish = new BeerPrice(1724,3448,4619,6705,11175,"../assets/img/shop/3.jpg");
const porter = new BeerPrice(1724,3448,4619,6705,11175,"../assets/img/shop/4.jpg");
const ipa = new BeerPrice(1771,3542,5022,7290,12150,"../assets/img/shop/5.jpg");
const cerveza = {doradaPampeana:doradaPampeana,golden:golden,scottish:scottish,porter:porter,ipa:ipa};


const DateTime = luxon.DateTime
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
        price.innerHTML=`$${cerveza[styleBeerValue][containerBeerValue]}`;
        totalPrice.innerHTML=`$${cerveza[styleBeerValue][containerBeerValue]*amount.value}`;
    }
};

amount.onchange =() =>{
    cantidad=amount.value;
    totalPrice.innerHTML=cerveza[styleBeerValue][containerBeerValue]*cantidad;
}



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

precioFinal.innerHTML=`$${sumador}`;
precioEnPantalla.innerHTML=`
<h3 class="text-center text-white">PRECIO TOTAL</h3>
<h4 class="text-center text-success">$${sumador}</h4>
`
}

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
 total.push({estilo:styleBeerVal,envase:containerBeerVal,cantidadElegida:cantidad,precioTotal:cerveza[styleBeerValue][containerBeerValue]*amount.value});

for (let i=0; i<total.length ; i++){
    sumador += total[i].precioTotal;
};
precioFinal.innerHTML=`$${sumador}`;
precioEnPantalla.innerHTML=`
<h3 class="text-center text-white">PRECIO TOTAL</h3>
<h4 class="text-center text-success">$${sumador}</h4>
`
};

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
            <form>
            <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Nombre y Apellido:</label>
            <input type="text" class="form-control" id="recipient-name">
        </div>
            <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Su Email:</label>
                <input type="email" class="form-control" id="recipient-name">
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
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Seguir agregando</button>
            <input type="submit" href="#" class="btn btn-primary" id="compraFinal" value="COMPRAR">
        </div>
        </div>
    </div>
    </div>
</div>
`;

botonCompra.setAttribute("disabled","true")

botonCompra.onclick = () =>{
    listaCompra.innerHTML=``;
    total.forEach((producto,index)=>listaCompra.innerHTML+=`
    <tr id="${index}">
        <td class="px-3">${producto.estilo}</td>
        <td class="px-3">${producto.envase}</td>
        <td class="px-3">${producto.cantidadElegida}</td>
        <td class="px-3">$${producto.precioTotal}</td>
        <br>
    </tr>
    `);
}
compraFinal.onclick =()=>{
    localStorage.setItem("fecha",JSON.stringify(new Date));
    localStorage.setItem(`productos`,JSON.stringify(total));
    console.log(localStorage.getItem(`productos`));
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: "Si quieres cancelar la compra, este es el mejor momento!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Estoy seguro',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Felicidades!',
            `Su producto llegara aproximadamente el ${deliveryDay[8]+deliveryDay[9]+"/"+deliveryDay[5]+deliveryDay[6]+"/"+deliveryDay[0]+deliveryDay[1]+deliveryDay[2]+deliveryDay[3]}`,
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelada',
            'Su compra se a cancelado',
            'error'
          )
        }
      })
}