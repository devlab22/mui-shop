
//import './App.css';

import React, { useState, Fragment, useEffect } from 'react';
import { Shop, Countries } from './components';
import { Box, Tabs, Tab } from '@mui/material';
import { Flag, AutoStories } from '@mui/icons-material';
import PropTypes from 'prop-types';

function App() {

  const [value, setValue] = useState(parseInt(sessionStorage.getItem('tab')) || 0);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");


  useEffect(() => {
    if (sessionStorage.getItem('tab')) {
      setValue(parseInt(sessionStorage.getItem('tab')));
    }

    // alphabet = String.fromCharCode(...Array(128).keys()).slice(65, 91);

  }, [])

  const handleOnTabChanged = (e, newValue) => {
    //console.log(newValue)
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
        <Tabs
          variant='scrollable'
          value={value} 
          onChange={handleOnTabChanged} 
          aria-label="basic tabs example">
          <Tab   
          label="Books" icon={<AutoStories />} value={100} />
          <Tab label="Countries" icon={<Flag />} value={101} />

          {alphabet.map((item, index) => (
            <Tab key={index} label={`${item}`} icon={<Flag />} value={index} />
          ))
          }

        </Tabs>
      </Box>
      <TabPanel value={value} index={100}>
        <Fragment>
          <Shop />
        </Fragment>
      </TabPanel>
      <TabPanel value={value} index={101}>
        <Countries />
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
