
//import './App.css';

import React, { useState, Fragment, useEffect } from 'react';
import { Shop, Countries } from './components';
import { Box, Tabs, Tab } from '@mui/material';
import { Flag, AutoStories } from '@mui/icons-material';
import PropTypes from 'prop-types';

function App() {

  const [value, setValue] = useState(parseInt(sessionStorage.getItem('tab'))|| 0);


  useEffect(() => {
      if(sessionStorage.getItem('tab')){
        setValue(parseInt(sessionStorage.getItem('tab')));
      }
  }, [])

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

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleOnTabChanged} aria-label="basic tabs example">
          <Tab label="Books" icon={<AutoStories/>} value={0}/>
          <Tab label="Countries" icon={<Flag/>} value={1}/>
          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Fragment>
          <Shop/>
        </Fragment>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Countries/>
      </TabPanel>
      
    </>
  )

}

export default App;
