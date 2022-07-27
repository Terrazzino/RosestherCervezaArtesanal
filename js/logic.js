let selectBeer; //VARIABLE CREADA PARA INCORPORAR LA VARIABLE BEER QUE INDICA LA CERVEZA SELECCIONADA, DENTRO DE LOS CASE EN SWITCH Y DE QUE DE ESE MODO FUNCIONEN LAS CONCATENACIONES DE LOS ALERT DENTRO DE LAS FUNCIONES littersOfBottle() Y barrelLiters()
let amount; // En esta variable guardaremos la cantidad de botellas que se pediran en caso de seleccionar botellas como envase y en caso de barriles, cuantos barriles (no hablamos de litros)
let liters; //Variable para saber los Litros en los que esta interesado el comprador
let question; //Sabremos si el comprador quiere seguir agregando al carrito o si desea terminar la compra, esta relacionado a la variable Validation que dependiendo su valor terminara o no la compra
let container; //Almacenaremos la informacion relacionada a cual envase le interesa al comprador, que puede ser Barril o Botella
let stock; //Es una variable creada para incluir en cada Case del bucle switch y asi dependiendo la verveza seleccionada, stock valdra lo que valga el stock de esa cerveza, y asi podremos incluir un stock personalizado de cada cerveza en nuestras funciones
let validation = 1; // Cuando su valor es igual a 1 el while donde se puede realizar compras seguira funcionando, si su valor mediante la variable Question se modifica a 0, el bucle while termina y con el tambien la compra

//ESTAS VARIABLES CORRESPONDEN AL STOCK DE CADA CERVEZA POR SEPARADO
let stockScottish=1000;
let stockGolden=700;
let stockDoradaPampeana=1200;
let stockPorter=2000;
let stockIpa=1500;

//EN ESTE FRAGMENTO DE CODIGO MOSTRAMOS POR CONSOLA CUAL ES EL STOCK DE CERVEZAS EN LA FABRICA
console.log("STOCK");
console.log("Scottish: "+stockScottish+"lts.");
console.log("Golden: "+stockGolden+"lts.");
console.log("Dorada Pampeana: "+stockDoradaPampeana+"lts.");
console.log("Porter: "+stockPorter+"lts.");
console.log("Ipa: "+stockIpa+"lts.");

//En esta funcion trabajamos en caso que el cliente halla seleccionado como envase Botellas, el parametro howMuch toma el valor de Amount y con este valor calculamos cuantos litros se pidieron
//y comparamos con los litros en stock para saber si la compra se puede o no realizar
function litersOfBottle(howMuch){
    if((parseInt(howMuch)*6)/2<stock){
        stock-=(parseInt(howMuch)*6)/2;
        return alert("Usted a adquirido "+ parseInt(howMuch)*6 + " botellas de 500ml de " +selectBeer.toUpperCase()+" equivalente a: "+ (parseInt(howMuch)*6)/2 + " litros totales. \nMuchas gracias por su compra! Hasta luego!");
    }
    else{return alert("No tenemos stock para cubrir su demanda, lo sentimos, en este momento contamos con " + stock +"lts y usted requiere de " + (parseInt(howMuch)*6)/2) +"lts"}
}

//En esta funcion trabajamos en caso que el cliente halla seleccionado como envase Barriles, el parametro howMuch toma el valor de Amount y con este valor calculamos cuantos litros se pidieron
//y comparamos con los litros en stock para saber si la compra se puede o no realizar
function barrelLiters(howMuch){
    if(parseInt(howMuch)*parseInt(liters)<stock){
        stock-=parseInt(howMuch)*parseInt(liters);
        return alert("Usted a adquirido "+howMuch+" barriles de "+ liters + "lts de "+selectBeer.toUpperCase()+ " equivalentes a " +(parseInt(liters)*parseInt(howMuch))+"lts\nMuchas gracias por su compra! Hasta luego!");
    }
    else{return alert("No tenemos stock para cubrir su demanda, lo sentimos, en este momento contamos con " + stock +"lts y usted requiere de " + parseInt(howMuch)*parseInt(liters) +"lts")}
}

//En esta funcion definimos cual envase vamos a usar, sea Botella o Barril y pedimos al cliente que indique cuantas unidades va a querer y en caso de los barriles 
//indicamos cuantas unidades va a querer y de que litraje de barril.
//Dentro de esta funcion tambien invocamos a las funciones litersOfBottle y barrelLiters
function orderForm(){
    container = prompt("Cual envase precisa?\n Botella o Barril");
    if (container == "botella" || container =="Botella" || container == "BOTELLA" || container == "botellas" || container =="Botellas" || container == "BOTELLAS"){
        amount = prompt("Cuantos pack de 6 botellas desea adquirir?\nLas botellas se adquieren en pack de 6 botellas, indique cuantos packs desea:");
        litersOfBottle(amount);
    }
    else if(container == "barril" || container =="Barril" || container == "BARRIL" || container == "barriles" || container =="Barriles" || container == "BARRILES"){
        liters = prompt ("Cuantos litros desea?\nBarriles de: 20lts, 30lts y 50lts\nIndique solo el numero SIN LA UNIDAD");
        if(parseInt(liters)==20||parseInt(liters)==30||parseInt(liters)==50){
            amount = prompt ("Cuantos barriles desea adquirir?");
            barrelLiters(amount);
        }
        else{
            alert("No poseemos barriles con los litros que a indicado");
        }
    }
    else{
        alert ("El envase ingresado NO corresponde al catalogo");
    }
}



//El valor del bucle while sera distinto de 1 cuando pasemos como valor a la variable question "0" y ahi terminara el bucle
while (validation == 1){

    let beer = prompt("Indícanos cual cerveza te acompañara:\nMenu de Rosesther: \nScottish | Golden | Dorada Pampeana | Porter | Ipa");

    switch(beer){
        case "scottish":
        case "SCOTTISH":
        case"Scottish":
        selectBeer = beer;
        stock = stockScottish;
        orderForm();
        stockScottish = stock;
        break;

        case "golden":
        case "GOLDEN":
        case"Golden":
        selectBeer = beer;
        stock = stockGolden;
        orderForm();
        stockGolden = stock;
        break;
    

        case "dorada pampeana":
        case "DORADA PAMPEANA":
        case "Dorada Pampeana":
        case"Dorada pampeana":
        selectBeer = beer;
        stock = stockDoradaPampeana;
        orderForm();
        stockDoradaPampeana = stock;
        break;

        case "porter":
        case "PORTER":
        case"Porter":
        selectBeer = beer;
        stock = stockPorter;
        orderForm();
        stockPorter = stock;
        break;

        case "ipa":
        case "IPA":
        case"Ipa":
        selectBeer = beer;
        stock = stockIpa;
        orderForm();
        stockIpa = stock;
        break;

        default:
            alert("Esta cerveza no forma parte de nuestro catalogo");
            break;
    }
    question = parseInt(prompt("Si desea seguir agregando al carrito pulse '1' si desea terminar su compra pulse '0'"));
    if(question==1){
        validation = question;
    }
    else if(question == 0){
        validation = question;
        alert("Su compra a finalizado, desde Rosesther te decimos, Salud!");
    }
    else{
        alert("Solo se permite responder '1' o '0'");
    }
}


//Mostramos por consola la actualización del Stock siendo que ahora el comprador a consumido productos.
console.log("ACTUALIZACIÓN DE STOCK")
console.log("Scottish: "+stockScottish+"lts.");
console.log("Golden: "+stockGolden+"lts.");
console.log("Dorada Pampeana: "+stockDoradaPampeana+"lts.");
console.log("Porter: "+stockPorter+"lts.");
console.log("Ipa: "+stockIpa+"lts.");

//Realizamos un muestrario del catalogo de la cerveceria antes de finalizar la compra
let products = ["Scottish","Golden","Dorada Pampeana","Porter","Ipa"]

for (let i = 0 ; i<5 ; i++){
    alert("Entre nuestros productos también puede encontrar " + products[i]);
    do{
        alert(products[i].toUpperCase());
    }
    while(i>5)
}