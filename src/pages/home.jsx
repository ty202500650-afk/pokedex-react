import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import PokemonList from "../components/PokemonList";
import { httpClient } from "../api/httpClient";
import pokedexLogo from "../assets/pokedex_logo.png";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);

  const limit = 50;
  const offset = page * limit;

  useEffect(() => {
    if (search.trim() !== "") {
      return;
    }

    const getPokemons = async () => {
      try {
        setLoading(true);

        const response = await httpClient.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const detail = await httpClient.get(pokemon.url);

            return {
              name: detail.data.name,
              image:
                detail.data.sprites.other["official-artwork"].front_default,
              pokedexNumber: detail.data.id,
            };
          })
        );

        setPokemons(pokemonData);
      } catch (error) {
        console.error("Error loading Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    getPokemons();
  }, [page, search]);

  useEffect(() => {
    if (search.trim() === "") {
      return;
    }

    const searchPokemon = async () => {
      try {
        setLoading(true);

        const response = await httpClient.get(
          "https://pokeapi.co/api/v2/pokemon?limit=2000"
        );

        const searchText = search.toLowerCase().trim();

        const results = response.data.results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchText)
        );

        const pokemonData = await Promise.all(
          results.slice(0, 20).map(async (pokemon) => {
            const detail = await httpClient.get(pokemon.url);

            return {
              name: detail.data.name,
              image:
                detail.data.sprites.other["official-artwork"].front_default,
              pokedexNumber: detail.data.id,
            };
          })
        );

        setPokemons(pokemonData);
      } catch (error) {
        console.error("Error searching Pokémon:", error);
        setPokemons([]);
      } finally {
        setLoading(false);
      }
    };

    searchPokemon();
  }, [search]);

  const handleNext = () => {
    setPage((currentPage) => currentPage + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrevious = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 0));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    mb: 3,
  }}
>
  <Box
    component="img"
    src={pokedexLogo}
    alt="Pokédex"
    sx={{
      width: "280px",
      maxWidth: "80%",
      height: "auto",
    }}
  />
</Box>
      <TextField
        fullWidth
        label="Search Pokémon"
        value={search}
        onChange={handleSearch}
        sx={{
          mb: 4,
          backgroundColor: "white",
          borderRadius: 2,
        }}
      />

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 5,
          }}
        >
          <CircularProgress />
        </Box>
      ) : pokemons.length === 0 ? (
        <Typography
          textAlign="center"
          sx={{
            color: "white",
            fontSize: 20,
          }}
        >
          Pokémon not found.
        </Typography>
      ) : (
        <>
          <PokemonList pokemons={pokemons} />

          {}
          {search.trim() === "" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                disabled={page === 0}
                onClick={handlePrevious}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;