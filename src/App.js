
//import './App.css';

import React, { useState, Fragment, useEffect } from 'react';
import { Shop, Countries, CustomTableData, AccordionData } from './components';
import { Box, CssBaseline, Tabs, Tab, Typography } from '@mui/material';
import { Flag, AutoStories, TableRows } from '@mui/icons-material';
import PropTypes from 'prop-types';

function App() {

  const [value, setValue] = useState(100);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
  const [booksCount, setBooksCount] = useState(0);
  const [cntCountry, setCntCountry] = useState(0)


  useEffect(() => {
    if (sessionStorage.getItem('tab')) {
      setValue(parseInt(sessionStorage.getItem('tab')));
    }

    // alphabet = String.fromCharCode(...Array(128).keys()).slice(65, 91);

  }, [])

  const handleOnChangeCount = (count) => {

    console.log(count)
    document.getElementById('countryTab').textContent = `Countries (${count})`
    if(count !== cntCountry){
       setCntCountry(count)
    }
   

  }

  const TabWithCount = ({ children, count = 0 }) => {
  
    return (
      <Box sx={{ display: "inline-flex", alignItems: "center" }}>

        {count >= 0 ? (
          <Typography id='countryTab' component="div">{`${children} (${count})`}</Typography>
        ) :
          <Typography id='countryTab' component="div">{children}</Typography>
        }
      </Box>
    );
  };

  const handleOnTabChanged = (e, newValue) => {
    setValue(newValue)
    sessionStorage.setItem('tab', newValue)
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </Box>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}>

        <CssBaseline />
        <Tabs
          variant='scrollable'
          value={value}
          onChange={handleOnTabChanged}
          aria-label="basic tabs example"
        >

          <Tab label={`Books (${booksCount})`} icon={<AutoStories />} value={100} />
          <Tab label="table" icon={<TableRows />} value={102} />
          <Tab
            label={<TabWithCount count={cntCountry} >Countries</TabWithCount>}
            icon={<Flag />}
            value={101} />
          <Tab label="Accordion data" icon={<Flag />} value={103} />

          {alphabet.map((item, index) => (
            <Tab 
              key={index} 
              label={`${item}`} 
              icon={<Flag />} 
              value={index} 
              />
          ))
          }

        </Tabs>
      </Box>
      <TabPanel value={value} index={100}>
        <Fragment>
          <Shop setCount={setBooksCount} />
        </Fragment>
      </TabPanel>
      <TabPanel value={value} index={101}>
        <Countries changeCount={handleOnChangeCount} />
      </TabPanel>
      <TabPanel value={value} index={102}>
        <CustomTableData />
      </TabPanel>
      <TabPanel value={value} index={103}>
        <AccordionData />
      </TabPanel>


      {alphabet.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Fragment>
            <Countries firstLetter={item} />
          </Fragment>
        </TabPanel>
      ))
      }

    </>
  )

}

export default App;
