let beer; //Variable donde almacenaremos el estilo de cerveza
let toBuy = true; //Variable que determinara si se sigue o no agregando al carrito
let container; //Variable que guarda el tipo de envase seleccionado
let amount; //Variable que guarda la cantidad de unidades que se piden
let liters; //Variable que guarda la medida de barril seleccionado (20, 30 o 50lts)
let question; //Esta variable contendrá la respuesta de si quiere o no seguir agregando al carrito

const trolley = []; //Esta lista contendrá todos los productos que se agreguen al carrito

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
}while(toBuy);

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
noStock.forEach((noStockList)=>{console.log("Reponer Stock de:"); 
console.table(noStockList)}
);
const total = trolley.reduce((acumulador,priceBeer)=>acumulador + priceBeer.priceBeer,0); //Utilizamos un reduce() para calcular el total de la compra
const day = new Date;
alert("Costo total de: $"+total+"\nSu compra se realizo con éxito hoy: "+ day.toLocaleDateString()); //en el parte del total de la compra incluimos la fecha en que se realizo