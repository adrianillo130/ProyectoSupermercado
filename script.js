const fetchData = async () => {
    const config = {
        headers: {
            Accept: 'application/json',
        },
    }
    const response = await fetch("", config);
    const data = await response.json();
    pintarApi(data)
    console.log(data)
}


