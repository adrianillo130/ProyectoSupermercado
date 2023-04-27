

const giveMeProducts = async () => {
    const productsUrl = 'https://api.kroger.com/v1/products?filter.term=tuna&filter.locationId=01400943'; // cambiar el term "milk" por el producto deseado (variable?)
    const accessToken = await giveMeAccessKey();
    const productsResponse = fetch(productsUrl, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((dataApi) => {
        let productosArray = dataApi.data;
        //console.log(productosArray)
        //var productList = productArray.data;
        pintarCard(productosArray);
        
        
        //return productList;
        //se utiliza el .data para acceder a la parte de los datos del array
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  giveMeProducts();