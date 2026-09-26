import { Card, CardContent, Grid, Typography } from "@mui/material";

const PokemonBasicInfo = ({ pokemon }) => {
  return (
    <Card>
      <CardContent>
        <Grid
          container
          sx={{ textTransform: "capitalize" }}
          justifyContent="center"
          textAlign="center"
          spacing={2}
        >
          <Grid item xs={6}>
            <Typography variant="subtitle2">Height</Typography>
            <Typography variant="body2">
              {pokemon.height}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Weight</Typography>
            <Typography variant="body2">
              {pokemon.weight}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Types</Typography>

            {pokemon.types.map((type) => (
              <Typography
                variant="body2"
                key={type.type.name}
              >
                {type.type.name}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Abilities</Typography>

            {pokemon.abilities.map((ability) => (
              <Typography
                variant="body2"
                key={ability.ability.name}
              >
                {ability.ability.name}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PokemonBasicInfo;