/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";
//const url = "https://platzi-avo.vercel.app/api/avo";
const appNode = document.querySelector("#app");


appNode.addEventListener("click",(event) =>{
    if(event.target.nodeName == "H2"){
        window.alert("Hola");
    }
});


const formatPrice = (price) =>{
    const newPrice = new window.Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD",
    }).format(price);
    return newPrice;
};



//web.api
//Conectarnos al server
window
    .fetch(`${baseUrl}/api/avo`)
    //Procesar la respuesta y convertirla en JSon
    .then((respuesta) => respuesta.json())
    //JSON -> Data -> Renderizar info browser
    .then((responseJson)=>{
        const todosLosItems = [];
        responseJson.data.forEach((item) =>{
            //crear imagen
            const imagen = document.createElement('img');
            imagen.src = `${baseUrl}${item.image}`;
            imagen.className ="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";

            //Crear titulo
            const title = document.createElement('h2');
            title.className = "text-lg";
            title.textContent = item.name;

            //Crear precio
            const price = document.createElement('div');
            price.className = "text-gray-600";
            price.textContent = formatPrice(item.price);


            //Wrap precio y titulo
            const precioAndTitulo = document.createElement("div");
            precioAndTitulo.className = 'text-center md:text-left'
            precioAndTitulo.appendChild(title);
            precioAndTitulo.appendChild(price);

            //Wrap Img and priceAndTitle
            const card = document.createElement('div')
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300"
            card.append(imagen, precioAndTitulo)
            //console.log(card)            

            todosLosItems.push(card);
            })
            appNode.append(...todosLosItems);
});
