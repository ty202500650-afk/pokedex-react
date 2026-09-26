import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getColorFromUrl } from "../utils/colors";

const PokemonCard = ({ pokemon }) => {
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
    <Card
      sx={{
        backgroundColor: pokemonColor,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardActionArea>
        <Link
          to={`/pokemon/${pokemon.name}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <CardMedia
            component="img"
            image={pokemon.image}
            title={pokemon.name}
            sx={{
              height: 200,
              objectFit: "contain",
              p: 2,
              transition: "transform 0.25s ease",
            }}
          />

          <CardContent
            sx={{
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.35)",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                textTransform: "capitalize",
                mb: 0.5,
              }}
            >
              {pokemon.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                opacity: 0.6,
              }}
            >
              #{String(pokemon.pokedexNumber).padStart(3, "0")}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;