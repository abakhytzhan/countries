import { useState } from "react";
import { useGetAllCountriesQuery } from "../api/apiSlice";
import { getCountriesList } from "../utils/getCountriesList";
import SelectButtons from "../components/selectButtons/SelectButtons";
import CountryDnD from "../components/countryDnD/CountryDnd";
import Loading from "../components/loading/Loading";
import Error from "../components/error/Error";

const DragAndDrop = () => {
  const { data, isError, isLoading } = useGetAllCountriesQuery();
  const [countries, setCountries] = useState();

  const handleQuiz = (id) => {
    setCountries(getCountriesList(data, id));
  };

  return (
    <>
      {isLoading && <Loading />}
      {isError && <Error />}
      {data && data.length === 0 && <div>No data available</div>}
      {data && data.length !== 0 && (
        <SelectButtons handleButton={handleQuiz} name="DnD" />
      )}
      {countries && (
        <CountryDnD data={data} list={countries} handleQuiz={handleQuiz} />
      )}
    </>
  );
};

export default DragAndDrop;
