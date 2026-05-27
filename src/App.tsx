import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Loader from "./components/Loader";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";
import { BASE_URL, ALL_COUNTRIES_URL, } from "./Api/countries";
import type { Country } from "./Type";

const App = () => {

  const [countries, setCountries] = useState<Country[]>([]);

  const [selectedCountry, setSelectedCountry,] = useState<Country | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchCountries =
      async (): Promise<void> => {

        try {
          setLoading(true);

          const response =
            await axios.get<Country[]>(BASE_URL + ALL_COUNTRIES_URL);

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

      const country =
        countries.find(
          ({cca3}) =>
            cca3 === borderCode
        );

      return (
        country?.name.common ||
        borderCode
      );
    };

  return (

    <Container className="py-5">

      <h1 className="text-center mb-5">Get Countries</h1>

      {loading ? (

        <Loader />

      ) : (

        <Row
          className="
            countries-wrapper
            border
            rounded
            shadow-sm
            overflow-hidden
          "
          style={{height: "600px"}}
        >

          <Col
            md={4}
            className="
              border-end
              p-0
              h-100
            "
          >

            <CountriesList
              countries={countries}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />

          </Col>

          <Col md={8} className="p-4">

            <CountryDetails
              selectedCountry={selectedCountry}
              getBorderCountryName={getBorderCountryName}
            />

          </Col>

        </Row>
      )}

    </Container>
  );
};

export default App;