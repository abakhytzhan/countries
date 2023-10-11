import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { useGetAllCountriesQuery } from "../../api/apiSlice";

const CountrySelect = ({ showMode, inputWidth = 300 }) => {
  const [acValue, setACValue] = useState();
  const navigate = useNavigate();

  const { data } = useGetAllCountriesQuery();
  let countries = [];
  if (data) {
    countries = [...data];
    countries.sort((x, y) => x.name.common.localeCompare(y.name.common));
  }

  useEffect(() => {
    if (acValue) {
      const id = data.findIndex(
        (country) => country.name.common === acValue.name.common
      );
      navigate(`flags/${id}`);
    }
  }, [acValue]);

  return (
    <Autocomplete
      onChange={(event, value) => setACValue(value)}
      id="country-select-demo"
      sx={{
        width: inputWidth,
        background: "#fff",
        borderRadius: "4px",
        display: showMode,
      }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.name.common}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={option.flags.png}
            alt="Country flag"
          />
          {option.name.common} ({option.cca2})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Choose a country"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { border: "none" },
            },
          }}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
};

export default CountrySelect;
