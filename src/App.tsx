import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";

const BASE_URL = 'https://restcountries.com';
const ALL_COUNTRIES_URL = '/v3.1/all?fields=name';

type Country = {
  name: { common: string };
};

const App = () => {

  const [countries, setCountries] = useState<Country[]>([]);
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

  return (

    <Container className="py-5">

      <h1 className="text-center mb-5">Countries</h1>

      {loading ? (

        <div className="text-center">

          <Spinner
            animation="border"
            variant="primary"
          />

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

              {countries.map((country) => (

                <ListGroup.Item key={country.name.common} action>
                  {country.name.common}
                </ListGroup.Item>

              ))}

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

            <h3 className="text-muted">Set counties</h3>

          </Col>

        </Row>
      )}

    </Container>
  );
};

export default App;