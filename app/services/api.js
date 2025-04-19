const ApiClient = (baseUrl) => ({
    async get(endpoint) {
        try {
            const response = await fetch(`${baseUrl}${endpoint}`);

            if(!response.ok) {
                return [null, `HTTP error! Status: ${response.statusText}`];
            }

            const data = await response.json();
            return [data, null];
        } catch (error) {
            console.error("Api request failed", error);
            return [null, error.message];
        }
    },
})

const api = ApiClient("https://restcountries.com/v3.1");

const countriesApi = {
    getAll: () => api.get("/all?fields=cca3,name,capital,region,population,flags"),
}

export { countriesApi };