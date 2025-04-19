"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { countriesApi } from "../../services";
import { useParams } from "next/navigation";
import { formatNumber } from "@/app/utils"

type DetailedCountry = {
  cca3: string;
  name: {
    common: string;
    official: string;
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
  const { common: countryName, official: officialName } = name ?? {};

  const languagesNames = Object.values(languages ?? {}).join(", ");
  const currenciesNames = Object.values(currencies ?? {}).map(
    ({ name, symbol }) => `${name} (${symbol})`
  );
  const [topLevelDomain] = tld ?? [];
  const bordersIds = borders ?? [];

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
          <h2 className="text-xl font-semibold mb-4">
            {countryName} ({id})
          </h2>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Official Name:</span>{" "}
              {officialName}
            </div>
            <div>
              <span className="font-semibold">Capital:</span> {capitalName}
            </div>
            <div>
              <span className="font-semibold">region:</span> {region}
            </div>
            <div>
              <span className="font-semibold">Population:</span>{" "}
              {formatNumber(population)}
            </div>
            <div>
              <span className="font-semibold">Languages:</span> {languagesNames}
            </div>
            <div>
              <span className="font-semibold">Currencies:</span>{" "}
              {currenciesNames}
            </div>
            <div>
              <span className="font-semibold">Top Level Domain:</span>{" "}
              {topLevelDomain}
            </div>
            <div className="md:max-w-80">
              <span className="font-semibold">Borders:</span>{" "}
              {bordersIds.length > 0
                ? bordersIds.map((borderId) => (
                    <Link key={borderId} href={`/country/${borderId}`}>
                      <button className="bg-gray-200 hover:bg-gray-300 mb-[6px] rounded text-xs mr-[6px] px-[6px] py-[1.5px]">
                        {borderId}
                      </button>
                    </Link>
                  ))
                : "No borders"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
