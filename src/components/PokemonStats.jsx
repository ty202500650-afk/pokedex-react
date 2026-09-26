import {
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const PokemonStats = ({ pokemon }) => {
  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="center">
          <Grid item>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {pokemon.stats.map((stat) => (
                    <TableCell
                      key={stat.stat.name}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {stat.stat.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  {pokemon.stats.map((stat) => (
                    <TableCell key={stat.stat.name}>
                      {stat.base_stat}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PokemonStats;