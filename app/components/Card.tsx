import Image from "next/image";

type CardProps = {
  index: number;
  flag: string;
  name: string;
  capital: string;
  region: string;
  population: number;
};

const Card = ({ index, flag, name, capital, region, population }: CardProps) => {
  return (
    <div className="h-full bg-white overflow-hidden rounded-lg shadow-lg">
      <div className="aspect-video w-full">
        <Image
          alt={`Flag of ${name}`}
          className="w-full h-full object-cover"
          src={flag || "https://via.placeholder.com/300"}
          width={500}
          height={300}
          priority={index < 12}
        />
      </div>
      <div className="p-6 text-sm text-gray-600">
        <h2 className="text-xl font-semibold mb-4">{name}</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <span className="font-semibold">Capital:</span>
            <span>{capital}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">region:</span>
            <span>{region}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">Population:</span>
            <span>{population}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
