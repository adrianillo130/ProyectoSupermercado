const credentials = 'supermarketapi-a461aff94f2a06b2d87fa4fc2712b8e56357725864215968761:adp15V8KxQ78PyVHUZnHwqJaFDnZYRu0jrO0ALbK';
const encodedCredentials = btoa(credentials);
const giveMeAccessKey = async () => {
    const res = await fetch("https://api.kroger.com/v1/connect/oauth2/token", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': 'Basic ' + encodedCredentials
      },
      body: "grant_type=client_credentials&scope=product.compact",
    }).then((response) => response.json());
    console.log(res)
    return res.access_token;
  };
  const giveMeProducts = async () => {
    const accessToken = await giveMeAccessKey();
    const productsUrl = 'https://api.kroger.com/v1/products?filter.term=verduras'; // cambiar el term "milk" por el producto deseado (variable?)
    const productsResponse = fetch(productsUrl, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  giveMeProducts();