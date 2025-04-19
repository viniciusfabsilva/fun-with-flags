"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { countriesApi } from "../../services";
import { useParams } from "next/navigation";

type DetailedCountry = {
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
  languages: Record<string, string>;
  currencies: Record<string, { name: string; symbol: string }>;
  tld: string[];
  borders: string[];
};

type Params = {
  id: string;
};

export default function Country() {
  const params = useParams<Params>();

  const [country, setCountry] = useState<DetailedCountry>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (params?.id && params.id !== id) {
      setId(params.id);
    }
  }, [params, id]);

  useEffect(() => {
    const fetchCountries = async () => {
      const [response, error] = await countriesApi.getCountry(id);
      setLoading(false);

      if (error) {
        setError(error);
        return;
      }

      setCountry(response);
    };

    if (id) {
      fetchCountries();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log(country);
  const {
    flags,
    capital,
    name,
    region,
    population,
    languages,
    currencies,
    tld,
    borders,
  } = country ?? {};

  const { svg: flag } = flags ?? {};
  const [capitalName] = capital ?? [];
  const { common: countryName } = name ?? {};

  const languagesNames = Object.values(languages ?? {}).join(", ");
  const currenciesNames = Object.values(currencies ?? {}).map(
    ({ name, symbol }) => `${name} (${symbol})`
  );
  const [topLevelDomain] = tld ?? [];
  const bordersIds = borders?.join(", ") ?? "";


  return (
    <>
      <div className="mb-8">
        <Link href="/">
          <button className="bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded">
            Back
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
        <div className="flex items-center md:max-w-[400px]">
          <Image
            alt={`Flag of ${name}`}
            className="max-h-80 object-cover rounded-lg shadow-md"
            src={flag || "/flag-placeholder.svg"}
            width={500}
            height={300}
            priority
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-sm text-gray-600">
          <h2 className="text-xl font-semibold mb-4">{ countryName } ({id})</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold">Capital:</span>
              <span>{capitalName}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">region:</span>
              <span>{ region }</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Population:</span>
              <span>{ population }</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Languages:</span>
              <span>{ languagesNames }</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Currencies:</span>
              <span>{ currenciesNames }</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Top Level Domain:</span>
              <span>{topLevelDomain}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Borders:</span>
              <span>{ bordersIds }</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
