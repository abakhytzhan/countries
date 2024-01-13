import { useState } from "react";
import { useGetAllCountriesQuery } from "../api/apiSlice";
import CountryQuiz from "../components/countryQuiz/CountryQuiz";
import { getCountriesList } from "../utils/getCountriesList";
import SelectButtons from "../components/selectButtons/SelectButtons";
import Loading from "../components/loading/Loading";
import Error from "../components/error/Error";

const Quiz = () => {
  const { data, isError, isLoading } = useGetAllCountriesQuery();
  const [countries, setCountries] = useState();

  const handleQuiz = (id) => {
    if (data) {
      setCountries(getCountriesList(data, id));
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {isError && <Error />}
      {data && data.length === 0 && <div>No data available</div>}
      {data && data.length !== 0 && (
        <SelectButtons handleButton={handleQuiz} name="Quiz" />
      )}
      {countries && (
        <CountryQuiz data={data} list={countries} handleQuiz={handleQuiz} />
      )}
    </>
  );
};

export default Quiz;
