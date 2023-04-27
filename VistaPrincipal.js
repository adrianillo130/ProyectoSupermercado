const TemporarySales = document.getElementById("TemporarySales")
const sectionFPName = document.createElement("h2")
sectionFPName.classList.add("sectionFP-name")
sectionFPName.innerHTML = "Rebajas temporales"
const containerCard = document.createElement("div")
containerCard.classList.add("containerCard")
TemporarySales.append(sectionFPName, containerCard)

//A partir de aquí se repite

clase = [
    {
        Nombre: 'Adrian',
        Edad: 20,
        Nacionalidad: 'Española',
    },
    {
        Nombre: 'Ricard',
        Edad: 25,
        Nacionalidad: 'Española',
    },
    {
        Nombre: 'Carlos',
        Edad: 20,
        Nacionalidad: 'Española',
    },
    {
        Nombre: 'Paola',
        Edad: 25,
        Nacionalidad: 'Mundo',
    }
]

clase.forEach(element => {
    const cardProduct = document.createElement("div")
    cardProduct.classList.add("cardProduct")
    containerCard.append(cardProduct)
    cardProduct.innerHTML = `<img src="" alt="" class="productImage">
                            <h3 class="productNaming">${element.Nombre}</h3>
                            <p class="productSpecification">${element.Edad}</p>
                            <p class="productPrice">${element.Nacionalidad}</p>
                            <button class="plusBasketButton"></button>`
});




//Productos De Temporada

const SeasonProducts = document.getElementById("SeasonProducts")
const SectionFPName = document.createElement("h2")
SectionFPName.classList.add("sectionFP-name")
SectionFPName.innerHTML = "Productos De Temporada"
SeasonProducts.appendChild(SectionFPName)



console.log(TemporarySales)
console.log(SeasonProducts)