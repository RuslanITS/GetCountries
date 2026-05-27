import { ListGroup } from "react-bootstrap";

import type { Country } from '../Type';

type CountriesListProps = {
  countries: Country[];
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country) => void;
};

const CountriesList = (props: CountriesListProps) => {
  const {countries, selectedCountry, setSelectedCountry} = props
  return (

    <ListGroup
      variant="flush"
      className="
        h-100
        overflow-auto
      "
    >

      {countries.map((country) => {

        const {name} = country;

        return (

          <ListGroup.Item
            key={name.common}
            onClick={() =>
              setSelectedCountry(country)
            }
            active={
              selectedCountry?.name.common ===
              name.common
            }
            action
          >
            {name.common}
          </ListGroup.Item>

        );
      })}

    </ListGroup>
  );
};

export default CountriesList;