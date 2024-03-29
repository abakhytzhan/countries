import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetAllCountriesQuery } from "../api/apiSlice";
import Error from "../components/error/Error";
import Loading from "../components/loading/Loading";
import BasicTable from "../components/table/Table";

const CountryDetails = () => {
  const { data, isError, isLoading } = useGetAllCountriesQuery();
  const { countryId } = useParams();

  let country = [];

  if (data && data.length === 0) {
    return <div>No data available</div>;
  }

  if (data) {
    if (
      isNaN(countryId) ||
      countryId >= data.length ||
      countryId < 0 ||
      countryId.length !== (Number(countryId) + "").length
    ) {
      return <Error />;
    } else {
      country = data[Number(countryId)];
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      {isError && <Error />}
      {data && (
        <>
          <div className="country">
            <h1>{country.name.common}</h1>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginBottom: "40px",
                flexWrap: "wrap",
                gap: "30px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {country.flags.png ? (
                  <img
                    className="country__flag"
                    src={country.flags.png}
                    alt="Country flag"
                    style={{
                      border: "2px solid gray",
                    }}
                  />
                ) : (
                  <Box
                    className="country__flag text"
                    sx={{
                      color: "text.secondary",
                      width: "375px",
                      border: "2px solid lightgray",
                    }}
                  >
                    No <br />
                    image <br />
                    available
                  </Box>
                )}

                <Typography variant="p" color="text.secondary">
                  Flag
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {country.coatOfArms.png ? (
                  <img
                    className="country__coatofarms"
                    src={country.coatOfArms.png}
                    alt="Coat of Arms"
                  />
                ) : (
                  <Box
                    className="text"
                    sx={{
                      color: "text.secondary",
                      width: "208px",
                      height: "250px",
                      border: "2px solid lightgray",
                      marginBottom: "20px",
                    }}
                  >
                    No <br />
                    image <br />
                    available
                  </Box>
                )}

                <Typography variant="p" color="text.secondary">
                  Coat of arms
                </Typography>
              </div>
            </Box>
            {country && <BasicTable country={country} />}
          </div>
        </>
      )}
    </>
  );
};

export default CountryDetails;
