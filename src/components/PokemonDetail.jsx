import { Box, Button, CircularProgress, Container, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";
import PokemonAvatar from "./PokemonAvatar";
import PokemonBasicInfo from "./PokemonBasicInfo";
import PokemonStats from "./PokemonStats";

const PokemonDetail = () => {
  const { pokemonName } = useParams();

  const { pokemon, loading } = usePokemon({
    pokemonName,
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!pokemon) {
    return <div>Pokémon not found.</div>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <PokemonAvatar pokemon={pokemon} />
        </Grid>

        <Grid item xs={12} md={8}>
          <PokemonBasicInfo pokemon={pokemon} />
        </Grid>

        <Grid item xs={12}>
          <PokemonStats pokemon={pokemon} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PokemonDetail;