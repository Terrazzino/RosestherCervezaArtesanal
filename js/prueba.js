class BeerPrice{
    constructor(pack6, pack12, lts20, lts30, lts50){
        this.pack6 = pack6;
        this.pack12 = pack12;
        this.lts20 = lts20;
        this.lts30 = lts30;
        this.lts50 = lts50
    }
}
const doradaPampeana = new BeerPrice(1560,3120,4185,6075,10125);
const golden = new BeerPrice(1638,3276,4340,6300,10500);
const scottish = new BeerPrice(1724,3448,4619,6705,11175);
const porter = new BeerPrice(1724,3448,4619,6705,11175);
const ipa = new BeerPrice(1771,3542,5022,7290,12150);

const cerveza = {doradaPampeana:doradaPampeana,golden:golden,scottish:scottish,porter:porter,ipa:ipa};

//Seleccionamos el body para utilizarlo con el DOM
let body = document.getElementsByTagName("body");

//Creamos una tabla de compras
let tableTitle = document.createElement("table");
tableTitle.setAttribute("style","background:#8F8F8F; color:black; margin:auto; margin-bottom:5em; border-radius:5px")
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
                    <option selected>------</option>
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
                    <option selected>------</option>
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
`
    let styleBeer = document.getElementById("styleBeer");
    let amount = document.getElementById("unidades");
    let totalPrice = document.getElementById("precioTotal")
    let price = document.getElementById("precio");
    let styleBeerVal;
    let containerBeerVal;
    let styleBeerValue;
    let containerBeerValue;

styleBeer.onchange = ()=>{
    styleBeerVal = styleBeer.options[styleBeer.selectedIndex].text;
    containerBeer.onchange = ()=>{
        let containerBeer = document.getElementById("containerBeer");
        containerBeerVal = containerBeer.options[containerBeer.selectedIndex].text;
        styleBeerValue = styleBeer.value;
        containerBeerValue = containerBeer.value;
        price.innerHTML=cerveza[styleBeerValue][containerBeerValue];
        amount.onchange =() =>{
            totalPrice.innerHTML=cerveza[styleBeerValue][containerBeerValue]*amount.value;
        }
    }
}


//Creamos un almacenador del carrito
let trolley = document.createElement("div");
trolley.className ="container text-center";
let divTrolley = document.createElement("div");
divTrolley.className="row";
document.body.append(trolley);
trolley.append(divTrolley);
const listTrolley = [];


let agregar = document.getElementById("btn-agregar");
let borrar;
agregar.onclick = () =>{
    listTrolley.push({estilo:styleBeerVal,envase:containerBeerVal});
    console.log(listTrolley);
}

listTrolley.forEach(agregar=>divTrolley.innerHTML+=`
    <div class="card col-4" style="width: 18rem;">
        <div class=" card-body">
            <h5 class="card-title">${agregar.estilo}</h5>
            <p class="card-text">${agregar.envase}</p>
            <button type="button" class="btn btn-danger borrar">QUITAR</button>
        </div>
 </div>`);