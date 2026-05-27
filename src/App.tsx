import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";

const BASE_URL = 'https://restcountries.com';
const ALL_COUNTRIES_URL = '/v3.1/all?fields=name,capital,population,region,flags,borders,cca3';

type Country = {
  name: { common: string };
  capital?: string[];
  population: number;
  region: string;
  borders?: string[];
  cca3: string;
  flags: { png: string };
};

const App = () => {

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchCountries =
      async (): Promise<void> => {

        try {

          setLoading(true);

          const response = await axios.get<Country[]>(BASE_URL + ALL_COUNTRIES_URL);

          setCountries(response.data);

        } catch (error) {

          console.error("error:", error);

        } finally {
          setLoading(false);
        }
      };

    void fetchCountries();

  }, []);

  const getBorderCountryName =
    (borderCode: string): string => {

      const country = countries.find(
        (country) =>
          country.cca3 === borderCode
      );

      return (country?.name.common || borderCode);
    };

  return (

    <Container className="py-5">

      <h1 className="text-center mb-5">Countries</h1>

      {loading ? (

        <div className="text-center">

          <Spinner animation="border" variant="danger" />

        </div>

      ) : (

        <Row
          className="border rounded shadow-sm overflow-hidden"
          style={{
            height: "600px",
          }}
        >

          <Col md={4} className="border-end p-0 h-100">

            <ListGroup variant="flush" className="h-100 overflow-auto">

              {countries.map((country) => {

                const {name} = country;

                return (

                  <ListGroup.Item
                    key={name.common}
                    onClick={() =>
                      setSelectedCountry(country)
                    }
                    action
                  >
                    {name.common}
                  </ListGroup.Item>

                );
              })}

            </ListGroup>

          </Col>

          <Col
            md={8}
            className="
              d-flex
              justify-content-center
              align-items-center
            "
          >

            {selectedCountry ? (

              <div className="text-center">

                <img
                  src={selectedCountry.flags.png}
                  alt={selectedCountry.name.common}
                  className="mb-4 rounded shadow"
                  style={{
                    width: "250px",
                  }}
                />

                <h2 className="mb-3">{selectedCountry.name.common}</h2>

                <p>
                  <strong>Capital : </strong>
                  {selectedCountry.capital?.[0]}
                </p>

                <p>
                  <strong>Population : </strong>
                  {selectedCountry.population}
                </p>

                <p>
                  <strong>Region : </strong>
                  {selectedCountry.region}
                </p>

                <p><strong>Borders:</strong></p>

                <ul>

                  {selectedCountry.borders?.map((border) => (

                    <li
                      key={border}>
                      {getBorderCountryName(border)}
                    </li>

                  ))}

                </ul>

              </div>

            ) : (

              <h3 className="text-muted">Choose country</h3>

            )}

          </Col>

        </Row>
      )}

    </Container>
  );
};

export default App;