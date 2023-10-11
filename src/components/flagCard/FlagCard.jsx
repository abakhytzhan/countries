import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FlagCard = ({ country, index }) => {
  const navigate = useNavigate();
  const cardHandler = () => {
    navigate(`/flags/${index}`);
  };
  return (
    <Card
      sx={{
        width: 200,
        boxShadow: "0px 0px 5px 2px lightgray",
        ":hover": {
          boxShadow: "0px 0px 5px 4px rgba(25, 118, 210, 0.7)",
          transition: "0.2s",
        },
        cursor: "pointer",
      }}
      onClick={() => cardHandler()}
    >
      {country.flags.png ? (
        <CardMedia
          component="img"
          alt="contry flag"
          height="110"
          image={country.flags.png}
          sx={{ borderBottom: "2px solid lightgray" }}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            height: "110px",
            color: "text.secondary",
            borderBottom: "2px solid lightgray",
          }}
        >
          <span>No</span>
          <span>image</span>
          <span>available</span>
        </Box>
      )}

      <CardContent>
        <Typography gutterBottom variant="h6" mb="0">
          {country.name.common}
        </Typography>
        <Typography variant="p" color="text.secondary">
          {country.region}
        </Typography>
        <Typography variant="p" sx={{ display: "flex", marginTop: 1 }}>
          <span>👨‍👩‍👧‍👦</span>
          {new Intl.NumberFormat("ru-RU").format(country.population)} people
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FlagCard;
