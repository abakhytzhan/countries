import { Box, Button } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import CoatOfArmsCard from "../coatOfArmsCard/CoatOfArmsCard";
import { useGetAllCountriesQuery } from "../../api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { incrementByAmount } from "../flagCards/flagCardsSlice";
import Counter from "../counter/Counter";
import Loading from "../loading/Loading";
import Error from "../error/Error";

export const CoatOfArmsCards = () => {
  const count = useSelector((state) => state.flag.value);
  const dispatch = useDispatch();

  const { data, isError, isLoading } = useGetAllCountriesQuery();

  const countries = data?.slice(0, count);

  const loadHandler = () => {
    const flags = data?.length - count;
    if (flags <= 0) {
      return;
    } else if (flags >= 12) {
      dispatch(incrementByAmount(12));
    } else if (flags < 12) {
      dispatch(incrementByAmount(flags));
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      {isError && <Error />}
      {data && <Counter data={data} count={count} />}
      {data && (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              maxWidth: "950px",
              margin: "0 auto 20px",
              justifyContent: "center",
              gap: 30,
              padding: "0 10px",
            }}
          >
            {countries.map((country, index) => {
              return (
                <CoatOfArmsCard country={country} key={index} index={index} />
              );
            })}
          </div>
          {data.length > count ? (
            <Box textAlign="center" marginBottom={5}>
              <Button
                onClick={loadHandler}
                variant="contained"
                endIcon={<KeyboardDoubleArrowDownIcon />}
              >
                Load
              </Button>
            </Box>
          ) : null}
        </>
      )}
    </>
  );
};
