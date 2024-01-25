import * as React from "react";
import { Typography, Grid, Box, Stack, Divider, Paper } from '@mui/material'
import { Title, MyRadioGroup, CollapsibleTableView } from '../components'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
//create our style
const styles = {
  paper: {
    height: 60,
    width: 100,
    backgroundColor: "black",
    color: 'white',
    textAlign: 'center',
  }
};

export default function SpacingGridDemo() {
  //create our spacing variable. Default value will be 2
  const [spacing, setSpacing] = React.useState(2);
  const [direction, setDirection] = React.useState('row')
  const [justifyContent, setJustifyContent] = React.useState('center')
  const [alignItems, setAlignItems] = React.useState('center')


  return (
    <Box>
      <React.Fragment>
        {/*This container will be aligned in the center */}
        {/* Spacing will vary depending on user choice.*/}
        <Title title="Grid" />
        <Divider sx={{ m: '10px 0' }} />
        <Grid
          container
          justifyContent={justifyContent}
          direction={direction}
          alignItems={alignItems}
          spacing={spacing}
        >
          {/*Render 3 empty black boxes as items of this container*/}
          {[0, 1, 2, 3, 4].map((value) => (
            <Grid key={value} item>
              <Paper
                sx={styles.paper}
              >
                <Typography>
                  {`item ${value + 1}`}
                </Typography>

              </Paper>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ m: '10px 0' }} />
      </React.Fragment>

      <Stack gap={2} direction='row' alignItems='center' justifyContent='space-between'>

        <MyRadioGroup
          title={`Direction = ${direction}`}
          width='300px'
          elevation={3}
          // row
          values={['row', 'row-reverse', 'column', 'column-reverse']}
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        />

        <MyRadioGroup
          title={`Spacing = ${spacing}`}
          //row
          values={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          value={spacing.toString()}
          onChange={(e) => setSpacing(Number(e.target.value))}
        />

        <MyRadioGroup
          title={`justifyContent = ${justifyContent}`}
          width='350px'
          // row
          values={['flex-start', 'center', 'flex-end', 'space-between', 'space-around']}
          value={justifyContent}
          onChange={(e) => setJustifyContent(e.target.value)}
        />

        <MyRadioGroup
          title={`alignItems = ${alignItems}`}
          width='250px'
          // row
          values={['flex-start', 'center', 'flex-end', 'stretch', 'baseline']}
          value={alignItems}
          onChange={(e) => setAlignItems(e.target.value)}
        />

      </Stack>

      <Divider sx={{ m: '10px 0' }} />

      <TableContainer component={Paper}>
      <Title title="Simple Table" />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ m: '10px 0' }} />

      <CollapsibleTableView/>

    </Box>
  );
}