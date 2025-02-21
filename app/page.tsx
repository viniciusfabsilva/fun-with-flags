import { Header, Card, Footer, Grid } from "./components";

const countries = [
  {
    id: 1,
    country: "Brazil",
    capital: "Brasília",
    region: "América do Sul",
    population: "211000000",
  },
  {
    id: 2,
    country: "Japan",
    capital: "Tokyo",
    region: "Ásia",
    population: "126000000",
  },
  {
    id: 3,
    country: "United States",
    capital: "Washington D.C.",
    region: "América do Norte",
    population: "331000000",
  },
  {
    id: 4,
    country: "Germany",
    capital: "Berlin",
    region: "Europa",
    population: "83000000",
  },
  {
    id: 5,
    country: "India",
    capital: "New Delhi",
    region: "Ásia",
    population: "1380000000",
  },
  {
    id: 6,
    country: "Australia",
    capital: "Canberra",
    region: "Oceania",
    population: "25000000",
  },
  {
    id: 7,
    country: "Nigeria",
    capital: "Abuja",
    region: "África",
    population: "200000000",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Grid>
          {countries.map(({ id, country, capital, region, population }) => (
            <Card
              key={id}
              country={country}
              capital={capital}
              region={region}
              population={population}
            />
          ))}
        </Grid>
      </main>
      <Footer />
    </>
  );
}
