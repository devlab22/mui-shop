import * as React from "react";
import { Typography, Grid, Box, Stack, Divider, Paper } from '@mui/material'
import { Title, MyRadioGroup, CollapsibleTableView, TableView } from '../components'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
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

const headers = [
  { fieldname: 'name', seqnr: 1, name: 'Dessert (100g serving)' },
  { fieldname: 'calories', seqnr: 2, name: 'Calories', hidden: false },
  { fieldname: 'fat', seqnr: 3, name: 'Fat (g)' },
  { fieldname: 'carbs', seqnr: 4, name: 'Carbs (g)' },
  { fieldname: 'protein', seqnr: 5, name: 'Protein (g)' }
]


export default function SpacingGridDemo() {
  //create our spacing variable. Default value will be 2
  const [spacing, setSpacing] = React.useState(2);
  const [direction, setDirection] = React.useState('row')
  const [justifyContent, setJustifyContent] = React.useState('center')
  const [alignItems, setAlignItems] = React.useState('center')

  const Item = ({ value = 0 }) => {

    const [elevation, setElevation] = React.useState(3)

    return (
      <Paper
        sx={styles.paper}
        elevation={elevation}
        onMouseOver={() => setElevation(10)}
        onMouseLeave={() => setElevation(3)}
      >
        <Typography>
          {`item ${value + 1}`}
        </Typography>

      </Paper>
    )
  }

  return (
    <React.Fragment>
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
                <Item value={value} />
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ m: '10px 0' }} />
        </React.Fragment>

        <Stack
          gap={2}
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ pb: '10px' }}
        >

          <MyRadioGroup
            title={`Direction = ${direction}`}
            width='300px'
            elevation={3}
            // row
            values={['row', 'row-reverse', 'column', 'column-reverse']}
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            useElevation={10}
          />

          <MyRadioGroup
            title={`Spacing = ${spacing}`}
            //row
            values={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            value={spacing.toString()}
            onChange={(e) => setSpacing(Number(e.target.value))}
            useElevation={10}
          />

          <MyRadioGroup
            title={`justifyContent = ${justifyContent}`}
            width='350px'
            // row
            values={['flex-start', 'center', 'flex-end', 'space-between', 'space-around']}
            value={justifyContent}
            onChange={(e) => setJustifyContent(e.target.value)}
            useElevation={10}
          />

          <MyRadioGroup
            title={`alignItems = ${alignItems}`}
            width='250px'
            // row
            values={['flex-start', 'center', 'flex-end', 'stretch', 'baseline']}
            value={alignItems}
            onChange={(e) => setAlignItems(e.target.value)}
            useElevation={10}
          />

        </Stack>

        <Stack gap={5}>

          <TableView
            headers={headers}
            data={rows}
            title="Simple Table"
            //sum
            useElevation={10}
          />

          <CollapsibleTableView useElevation={10} />

        </Stack>

      </Box>

    </React.Fragment>
  );
}