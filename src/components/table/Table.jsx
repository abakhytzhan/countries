import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, data) {
  return { name, data };
}

export default function BasicTable({ country }) {
  const rows = [
    createData("Continents", country.continents.join(", ")),
    createData("Region", country.region),
    createData("SubRegion", country.subregion),
    createData("Country Code", country.cca2),
    createData("Capital", country.capital.join(", ")),
    createData("Area", new Intl.NumberFormat("ru-RU").format(country.area)),
    createData(
      "Population",
      new Intl.NumberFormat("ru-RU").format(country.population) + " people"
    ),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "td, th": { bgcolor: "background.default", fontSize: "18px" },
              }}
            >
              <TableCell component="th" scope="row" sx={{ width: "30%" }}>
                {row.name}
              </TableCell>
              <TableCell align="left">{row.data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
