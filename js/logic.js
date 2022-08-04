//Creamos una clase constructora para crear objetos de cada tipo de cerveza con propiedades que equivalgan al valor y al stock de cada cerveza
class BeerPrice {
    constructor(price, stock){
        this.price = price;
        this.stock = stock;
        this.talk = function(){alert(this.typeBeer+" = "+this.price)}
    }
}

//Creamos los Objetos para las cervezas Embotelladas
const scottishTwelveBeers = new BeerPrice(2932,true);
const goldenTwelveBeers = new BeerPrice(2808,true);
const doradaPampeanaTwelveBeers = new BeerPrice(2652,true);
const porterTwelveBeers = new BeerPrice(2932,true);
const ipaTwelveBeers = new BeerPrice(3026,true);

//Creamos los Objetos para las cervezas Embarriladas en 20lts
const scottishBarrel20 = new BeerPrice(4000,true);
const goldenBarrel20 = new BeerPrice(3200,true);
const doradaPampeanaBarrel20 = new BeerPrice(3100,true);
const porterBarrel20 = new BeerPrice(4300,true);
const ipaBarrel20 = new BeerPrice(5000,true);

//Creamos los Objetos para las cervezas Embarriladas en 30lts
const scottishBarrel30 = new BeerPrice(5900,true);
const goldenBarrel30 = new BeerPrice(5900,true);
const doradaPampeanaBarrel30 = new BeerPrice(4600,true);
const porterBarrel30 = new BeerPrice(6400,true);
const ipaBarrel30 = new BeerPrice(7400,true);

//Creamos los Objetos para las cervezas Embarriladas en 50lts
const scottishBarrel50 = new BeerPrice(9800,true);
const goldenBarrel50 = new BeerPrice(7800,true);
const doradaPampeanaBarrel50 = new BeerPrice(7650,true);
const porterBarrel50 = new BeerPrice(10600,true);
const ipaBarrel50 = new BeerPrice(12300,true);

//ARRAYS para contener los objetos de cada cerveza separados por estilo conteniendo cada lista las diferentes medidas de embazado 
const scottish=[scottishTwelveBeers.price, scottishBarrel20.price, scottishBarrel30.price, scottishBarrel50.price];
const golden=[goldenTwelveBeers.price, goldenBarrel20.price, goldenBarrel30.price, goldenBarrel50.price];
const doradaPampeana=[doradaPampeanaTwelveBeers.price, doradaPampeanaBarrel20.price, doradaPampeanaBarrel30.price, doradaPampeanaBarrel50.price];
const porter=[porterTwelveBeers.price, porterBarrel20.price, porterBarrel30.price, porterBarrel50.price];
const ipa=[ipaTwelveBeers.price, ipaBarrel20.price, ipaBarrel30.price, ipaBarrel50.price];

let toBuy = true; //Mientras esta variable sea true el comprador podrá agregar al carrito, cuando el comprador decida no comprar mas, se hará false
let container; //Declaramos la variable que define si el envase sera Botella o Barril
let amount; //Declaramos la variable que define la cantidad de unidades que encargara el cliente
let liters; //Declaramos la variable que determinara de cuantos litros sera el barril a pedir
let beer; //Declaramos la variable que define que tipo de cerveza se comprara
let questions; //Declaramos la variable que definirá si el cliente desea seguir comprando o no
let total=0; //En la variable total es donde almacenaremos el precio final de la compra

const trolley = []; // En esta lista vacía iremos agregando los productos que se irán agregando al carrito



alert("Bienvenido a Rosesther\nTenemos para ofrecerte distintos estilos de cervezas"); //Bienvenida al sitio

//Función para seleccionar el envase y la cantidad de unidades a comprar
function beerContainer(howBeer){ //Utilizo una función con parámetro para poder asi reemplazar su valor por el de la cerveza elegida y de ella poder agregar a la lista trolley
    alert("Buena elección! Estamos cada vez mas cerca.\nAhora indícanos que envase te interesa adquirir.");
    container = prompt("¿Botella o Barril?").toUpperCase();
    if(container=="BOTELLA"||container=="BOTELLAS"){
        alert("Ten en cuenta que las botellas se compran en packs y cada pack contiene doce botellas de 500ml");
        amount = parseInt(prompt("Cuantos packs deseas?"));
        trolley.push({style:amount + " unidades de 12 "+beer +" en Botellas de 500ml" , priceBuy:howBeer[0]*amount}); //agregamos a la lista trolley dos calves "style" y "priceBuy" para utilizarlas luego
        alert("Has adquirido "+amount*6+"lts de "+beer+" en botellas de 500ml\nEl precio total es de: $"+howBeer[0]*amount);
    }
    else if(container=="BARRIL"||container=="BARRILES"){
        alert("Perfecto!!! Tenemos tres medidas de barriles:\n20lts | 30lts | 50lts");
        liters = parseInt(prompt("20 | 30 | 50\nNO indique la unidad SOLO el numero"));
        amount = parseInt(prompt("Cuantos barriles de "+ liters +"lts deseas?"));
        switch(liters){
            case 20:
                trolley.push({style:amount + " unidades de " +beer+" en Barril de 20lts" , priceBuy: howBeer[1]*amount});
            alert("Has adquirido "+amount*liters+"lts de "+beer+"en barriles de 20lts\nEl precio total es de: $"+howBeer[1]*amount);
            break;
            case 30:
                trolley.push({style:amount+" unidades de "+ beer+" en Barril de 30lts" , priceBuy: howBeer[2]*amount});
                alert("Has adquirido "+amount*liters+"lts de "+beer+"en barriles de 30lts\nEl precio total es de: $"+howBeer[2]*amount);
                break;
            case 50:
                trolley.push({style:amount+" unidades de "+ beer+" en Barril de 50lts" , priceBuy: howBeer[3]*amount});
                alert("Has adquirido "+amount*liters+"lts de "+beer+"en barriles de 50lts\nEl precio total es de: $"+howBeer[3]*amount);
                break;
            default:
                alert("No has ingresado una unidad de Barril correcta según lo indicado");
        }
    }
    else{
        alert("No poseemos este envase en nuestro catalogo");
    }
}

//Creamos una función para preguntar si se desea seguir comprando o no y dependiendo la respuesta, la variable declarada toBuy cambiara a false
function nextPurchase(){
    do{
        questions = prompt("Desea seguir agregando al carrito?\nSI | NO").toUpperCase();
        if(questions=="SI"){
            toBuy=true;
        }
        else if(questions=="NO"){
            toBuy=false;
        }
        else{
            alert("La respuesta no es valida. Vuelva a intentarlo");
        }
    }
    while(questions!="SI" && questions!="NO");
}
//En este bucle pedimos el estilo de cerveza y en base a la elección mediante un switch se ejecutaran las funciones correspondientes con sus valores personalizados
do{
    beer = prompt("Indícanos que cerveza deseas adquirir:\nScottish | Golden | Dorada Pampeana | Porter | Ipa").toUpperCase();
    switch(beer){
        case "SCOTTISH":
            beerContainer(scottish);
            nextPurchase();
            break;
        case "GOLDEN":
            beerContainer(golden);
            nextPurchase();
            break;
        case "DORADA PAMPEANA":
            beerContainer(doradaPampeana);
            nextPurchase();
            break;
        case "PORTER":
            beerContainer(porter);
            nextPurchase();
            break;
        case "IPA":
            beerContainer(ipa);
            nextPurchase();
            break;
        default:
            alert("Esta cerveza no forma parte de nuestro catalogo");
            break;
    }
}
while(toBuy);

//Ejecutamos un For ... Of que muestre los productos adquiridos y sus precios por separado
for (list of trolley){
    console.log("Productos comprados:\n"+list.style+" = $"+list.priceBuy);
    total = total + list.priceBuy;
}

//Mostramos el precio total de la compra
alert("El costo total de tu compra es de: $"+ total);