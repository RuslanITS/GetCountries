import type { Country } from "../Type";

type CountryDetailsProps = {
  selectedCountry: Country | null;

  getBorderCountryName:
    (borderCode: string) => string;
};

const CountryDetails = (props: CountryDetailsProps) => {
  const {selectedCountry, getBorderCountryName} = props
  if (!selectedCountry) {

    return (

      <div className="empty-country">
        <h3>Choose country</h3>
      </div>
    );
  }

  const {
    name,
    capital,
    population,
    region,
    borders,
    flags,
  } = selectedCountry;

  return (

    <div className="country-details">

      <div className="country-card">

        <img
          src={flags.png}
          alt={name.common}
          className="country-flag"
        />

        <h2 className="country-title">
          {name.common}
        </h2>

        <p className="country-info">
          <strong>Capital: </strong>
          {capital?.[0]}
        </p>

        <p className="country-info">
          <strong>Population: </strong>
          {population}
        </p>

        <p className="country-info">
          <strong>Region: </strong>
          {region}
        </p>

        <p className="country-info">
          <strong>Borders: </strong>
        </p>

        <div className="borders-wrapper">

          {borders?.length ? (

            borders.map((border) => (

              <span key={border} className="border-badge">
                {getBorderCountryName(border)}
              </span>

            ))

          ) : (

            <p className="border-badge">No bordering countries</p>

          )}

        </div>

      </div>

    </div>
  );
};

export default CountryDetails;