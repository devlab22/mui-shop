import * as React from "react";
import { Typography, Grid, Box, Stack, Divider, Paper } from '@mui/material'
import { Title, SearchSubmit, MyRadioGroup, CollapsibleTableView, TableView, LoadingCircle } from '../components'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

var rows = [
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

rows = rows.map((item, idx) => {

  idx++
  item.name = `${idx}. ${item.name}`
  return item
})


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
  const [radioValue, setRadioValue] = React.useState('')
  const content = ["circle", "blocks", "grid", "dots", "bars", "dna", "glass", "progressbar", "rotatingSquare"]

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
          <Title title='Search'/>
          <SearchSubmit 
            label='Search'
            onSubmit={(e) => console.log(e)}
            onRadioChange={(val) => {
              console.log(val)
              setRadioValue(val)
            }}
            rvalue={radioValue}
            radiobuttons={[{name: 'name', label: 'Name'}, {name: 'ipaddress', label: 'IP Address'}]}
            />
          <Title title="Loading..." />
          <Grid
            container
            spacing={2}
            justifyContent="space-around"
            alignItems="center"
          >
            {content.map((value, index) => (
              <Grid  key={index} item>
                 <LoadingCircle content={value} />
              </Grid>
             
            ))}
          </Grid>

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
            values={[{name: 'row', label: 'Row'}, {name : 'row-reverse', label: 'row-reverse'}, {name: 'column', label: 'column'}, {name: 'column-reverse', label: 'column-reverse'}]}
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            useElevation={10}
          />

          <MyRadioGroup
            title={`Spacing = ${spacing}`}
            //row
            values={[{name: 0, label: 0}, {name: 1, label: 1}, {name: 2, label: 2}]}
            value={spacing.toString()}
            onChange={(e) => setSpacing(Number(e.target.value))}
            useElevation={10}
          />

          <MyRadioGroup
            title={`justifyContent = ${justifyContent}`}
            width='350px'
            // row
            values={[{name: 'flex-start', label:'flex-start'}, {name: 'center', label: 'center'}, {name:'flex-end', label: 'flex-end'}, {name: 'space-between', label: 'space-between'}, {name: 'space-around', label: 'space-around'}]}
            value={justifyContent}
            onChange={(e) => setJustifyContent(e.target.value)}
            useElevation={10}
          />

          <MyRadioGroup
            title={`alignItems = ${alignItems}`}
            width='250px'
            // row
            values={[{name: 'flex-start', label: 'flex-start'}, {name: 'center', label: 'center'}, {name: 'flex-end', label: 'flex-end'}, {name: 'stretch', label: 'stretch'}, {name: 'baseline', label: 'baseline'}]}
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
            useElevation={10}
          />

          <CollapsibleTableView useElevation={10} />

        </Stack>

      </Box>

    </React.Fragment>
  );
}