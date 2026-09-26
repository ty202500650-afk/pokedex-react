import { Grid } from "@mui/material";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons }) => {
  return (
    <Grid container spacing={2}>
      {pokemons.map((pokemon) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
          <PokemonCard pokemon={pokemon} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonList;