import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CoatOfArmsCard = ({ country, index }) => {
  const navigate = useNavigate();
  const cardHandler = () => {
    navigate(`/coatofarms/${index}`);
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
      {country.coatOfArms.png ? (
        <CardMedia
          component="img"
          alt="country coat of arms"
          height="250"
          width="auto"
          image={country.coatOfArms.png}
          sx={{ borderBottom: "2px solid lightgray", objectFit: "contain" }}
        />
      ) : (
        <Box
          className="text"
          sx={{
            height: "250px",
            width: "auto",
            color: "text.secondary",
            borderBottom: "2px solid lightgray",
            objectFit: "contain",
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
      </CardContent>
    </Card>
  );
};

export default CoatOfArmsCard;
