import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getColorFromUrl } from "../utils/colors";

const PokemonAvatar = ({ pokemon }) => {
  const [pokemonColor, setPokemonColor] = useState("#f5f5f5");

  useEffect(() => {
    const getPokemonColor = async () => {
      const color = await getColorFromUrl(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`
      );

      if (color) {
        setPokemonColor(color);
      }
    };

    getPokemonColor();
  }, [pokemon.name]);

  return (
    <Card sx={{ backgroundColor: pokemonColor }}>
      <CardMedia
        component="img"
        sx={{ height: 300, objectFit: "contain" }}
        image={pokemon.sprites.other["official-artwork"].front_default}
        title={pokemon.name}
      />

      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textTransform: "capitalize" }}
          >
            {pokemon.name}
          </Typography>

          <Typography>
            #{pokemon.id}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PokemonAvatar;