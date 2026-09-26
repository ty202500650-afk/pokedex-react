const pokemonColors = {
  black: {
    background: "#E5E5E5",
    accent: "#333333",
  },
  blue: {
    background: "#DCEEFF",
    accent: "#2563EB",
  },
  brown: {
    background: "#F3E2D0",
    accent: "#8B5E3C",
  },
  gray: {
    background: "#E8EAED",
    accent: "#5F6368",
  },
  green: {
    background: "#DFF5E1",
    accent: "#2E7D32",
  },
  pink: {
    background: "#FFE1EC",
    accent: "#D81B60",
  },
  purple: {
    background: "#EDE1FF",
    accent: "#7B1FA2",
  },
  red: {
    background: "#FFE0E0",
    accent: "#D32F2F",
  },
  white: {
    background: "#F5F5F5",
    accent: "#616161",
  },
  yellow: {
    background: "#FFF4C2",
    accent: "#B8860B",
  },
};

export const getColorFromUrl = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return pokemonColors[data.color.name] || pokemonColors.gray;
  } catch (error) {
    console.error("Error getting Pokémon color:", error);

    return pokemonColors.gray;
  }
};