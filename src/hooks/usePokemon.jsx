import { useEffect, useState } from "react";
import { httpClient } from "../api/httpClient";

const usePokemon = ({ pokemonName }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        setLoading(true);

        const response = await httpClient.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );

        setPokemon(response.data);
      } catch (error) {
        console.error(error);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    if (pokemonName) {
      getPokemon();
    }
  }, [pokemonName]);

  return {
    pokemon,
    loading,
  };
};

export default usePokemon;