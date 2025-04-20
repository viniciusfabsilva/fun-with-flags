"use client";

import { Card, Grid, Search, Select } from "./components";
import { useEffect, useState } from "react";
import { countriesApi } from "./services";
import Link from "next/link";

type Country = {
  cca3: string;
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  capital: string[];
  region: string;
  population: number;
};

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("All Regions");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const [response, error] = await countriesApi.getAll();

      setLoading(false);
      if (error) {
        setError(error);
        return;
      }

      setCountries(response);
    };

    fetchCountries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const regions = ["All Regions", ...new Set(countries.map(({ region }) => region))];

  const sortedCountries = countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common, "en-US")
  );

  const filteredCountries = sortedCountries.filter(({ name, region }) => {
    const nameMatches = name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const regionMatches = selected === "All Regions" || region === selected;
    
    return nameMatches && regionMatches;
  });

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-4 justify-between mb-8">
        <Search
          count={filteredCountries.length}
          search={search}
          setSearch={setSearch}
        />
        <Select
          options={regions}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <Grid>
        {filteredCountries.map(
          ({ cca3, flags, name, capital, region, population }, index) => {
            const { svg: flag } = flags ?? {};
            const { common: countryName } = name ?? {};
            const [capitalName] = capital ?? [];

            return (
              <Link href={`/country/${cca3}`} key={cca3}>
                <Card
                  index={index}
                  name={countryName}
                  flag={flag}
                  capital={capitalName}
                  region={region}
                  population={population}
                />
              </Link>
            );
          }
        )}
      </Grid>
    </>
  );
}
