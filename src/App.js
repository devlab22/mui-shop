/* eslint-disable no-unused-vars */

import React, { useState, Fragment, useEffect } from 'react';
import { Shop, SimpleGrid, FoodsView, AlertDialog, MessageDialog, AddItemDialog, VideoView, StyledListView, Countries, CustomTableData, AccordionData, TreeData, TreeDataView, ChartsView, StyledTreeView } from './components';
import { Box, CssBaseline, Tabs, Tab, Typography } from '@mui/material';
import { Flag, AutoStories, TableRows } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Dashboard from './API/apiService';
import treeData from './data/treeData.json';
import myData from './data/treeView.json';
import listData from './data/listView.json'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BarChartIcon from '@mui/icons-material/BarChart';
import RestaurantIcon from '@mui/icons-material/Restaurant';


function App() {

  const [value, setValue] = useState(100);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
  const [booksCount, setBooksCount] = useState(0);
  const [cntCountry, setCntCountry] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const [cntTab, setCntTab] = useState([]);
  const [countries, setCountries] = useState([])
  const [tree, setTree] = useState()
  const [treeView, setTreeView] = useState()
  const [data, setData] = useState([]);
  const [styledList, setStyledList] = useState([])
  const [addItem, setAddItem] = useState(false)
  const [alertItem, setAlertItem] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedNode, setSelectedNode] = useState({ id: null, name: '', seqnr: 0 })
  const [parentNode, setParentNode] = useState({ id: null, name: '', seqnr: 0 })
  const [title, setTitle] = useState('')
  const [messages, setMessages] = useState([])


  useEffect(() => {

    async function loadData() {

      var tmp = [];
      setIsLoading(true);


      setData(myData)
      setStyledList(myData)
      

      recursiveTree(treeData.children, null, false)
      setTree(treeData)
      setTreeView(treeData)

      try {
        const data = await Dashboard.getCountries();
        //setCountries(data)
        setCntCountry(data.length);
        tmp = []
        data.forEach(element => {
          var key = element.name.common[0];
          var keyvalue = tmp.find(obj => obj.key === key);
          if (keyvalue) {
            tmp.map(item => {

              if (item.key === key) {
                item.count++;
              }

              return item;
            })
          } else {
            tmp.push({ key: key, count: 1 })
          }

        });

        setCntTab(tmp);

        setIsLoading(false);
      }
      catch (e) {
        console.log(e)
      }
    }

    if (sessionStorage.getItem('tab')) {
      setValue(parseInt(sessionStorage.getItem('tab')));
    }

    loadData();

    // alphabet = String.fromCharCode(...Array(128).keys()).slice(65, 91);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const getCount = (letter = null) => {

    var summe = 0;
    if (letter) {
      const keyvalue = cntTab.find(item => item.key === letter);
      if (keyvalue) {
        summe = keyvalue.count
      }
    }
    else {

      cntTab.forEach(item => {
        summe = summe + item.count;
      })

    }

    return summe;

  }

  const recursiveTree = (items, node, checked) => {

    items.forEach(item => {

      if (!node) {
        item.checked = checked
      }
      else {

        if (item.id === node.id) {
          item.checked = checked
          if (item.children) {
            recursiveTree(item.children, null, checked)
          }
          return item
        }
      }

      if (item.children) {
        recursiveTree(item.children, node, checked)
      }

    })
  }

  const onCheckboxChanged = (node, checked) => {

    var tmp = tree

    setTree({})
    recursiveTree(tmp.children, node, checked)
    setTree(tmp)
  }

  const handleOnDeleteItem = (node) => {

    alert(`delete id: ${node.id}`)
    /* var tmp = tree
    var result = deleteNode(node.id, tmp)
    console.log(result) */
    //setTree(result)
  }

  const deleteNode = (id, nodes) => {

    var result = nodes.children.filter(node => {

      if (node.id !== id) {
        return node
      }

      if (node.children && Array.isArray(node.children) && node.children.length > 0) {
        deleteNode(id, node.children)
      }

      return null
    })

    return result
  }

  const handleOnRemoveStyledList = (id) => {

    const selectedNode = styledList.find(item => item.id === id)
    setTitle(`remove Item`)
    setSelectedNode(selectedNode)
    setAlertItem(true)

  }

  const removeStyledItem = (id) => {
    setStyledList(prev => prev.filter(item => item.id !== id))
    setTitle(`Item removed`)
    setMessages([`ID: ${selectedNode.id}, Name: ${selectedNode.name}`])
    //setMessages([`ID: ${selectedNode.id}`, `Name: ${selectedNode.name}`])
    setShowMessage(true)
  }

  const handleOnItemClick = (id, expand) => {

    setStyledList(prev => prev.map(item => {

      if (item.id === id) {
        item.expandNode = expand

      }

      return item;
    }))
  }

  const handleOnAddStyledItem = (parentId) => {
    setTitle('add item')
    if (parentId === null) {
      setParentNode({ id: null, name: '', seqnr: 0 })
    }
    else {
      setParentNode(styledList.find(item => item.id === parentId))
    }

    setAddItem(true)
  }

  const addStyledItem = (data) => {

    var parentId = parentNode.id;

    if (parentId === null) {
      parentId = 0
    }

    const maxId = styledList.reduce((prev, current) => {
      return (prev && prev.id > current.id ? prev.id : current.id)
    })


    if (data.id !== selectedNode.id) {
      // insert
      setStyledList(prev => [...prev, { id: maxId + 1, parentId: parentId, name: data.name, seqnr: data.seqnr }])
    }
    else {

      if (selectedNode.id === null) {
        
        setStyledList(prev => [...prev, { id: maxId + 1, parentId: parentId, name: data.name, seqnr: data.seqnr }])
      }
      else {
        
        setStyledList(prev => prev.map(item => {

          if (item.id === data.id) {
            item.name = data.name;
            item.seqnr = data.seqnr;
          }

          return item;
        }))
      }

    }

    setSelectedNode({ id: null, name: '', seqnr: 0 })
    setParentNode({ id: null, name: '', seqnr: 0 })

  }

  const handleOnCheckStyledList = (id, checked) => {

    setStyledList(prev => prev.map(item => {

      if (item.id === id) {
        item.checked = checked

      }

      return item;
    }))
  }

  const handleOnEditStyledList = (id) => {
    setTitle('change item')
    setSelectedNode(styledList.find(item => item.id === id));
    setParentNode(styledList.find(item => item.id === id));
    setAddItem(true)
  }

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
          <Tab label={`Table Countries (${cntCountry})`} icon={<TableRows />} value={102} />
          <Tab label="Tree Data" icon={<AccountTreeIcon />} value={104} />
          <Tab label="Tree Data View" icon={<AccountTreeIcon />} value={105} />
          <Tab
            label={`Countries (${cntCountry})`}
            icon={<Flag />}
            value={101} />
          <Tab label="Accordion data" icon={<Flag />} value={103} />
          <Tab label="Styled Tree View" icon={<Flag />} value={106} />
          <Tab label="Video View" icon={<Flag />} value={107} />
          <Tab label="Styled List" icon={<Flag />} value={108} />
          <Tab label="Charts" icon={<BarChartIcon />} value={109} />
          <Tab label="Simple Grid" icon={<BarChartIcon />} value={110} />
          <Tab label="Food Information" icon={<RestaurantIcon />} value={111} />

          {/*  {alphabet.map((item, index) => (
            <Tab
              key={index}
              label={`${item} (${getCount(item)})`}
              icon={<Flag />}
              value={index}
            />
          ))
          } */}

        </Tabs>
      </Box>
      <TabPanel value={value} index={104}>
        <Fragment>
          <TreeData
            nodes={tree}
            checkbox
            title="List Item"
            handleCheck={onCheckboxChanged}
            handleDeleteItem={handleOnDeleteItem}
          />
        </Fragment>
      </TabPanel>
      <TabPanel value={value} index={105}>
        <Fragment>
          <TreeDataView
            nodes={treeView}
            onAdd={(parentId) => alert(`add to node ${parentId}`)}
            onRemove={(id) => alert(`delete ID: ${id}`)}
            onEdit={(id) => alert(`edit ID: ${id}`)}
            onCheck={(id, checked) => console.log(`ID: ${id}, checked: ${checked}`)}
          // autoSelect
          />
        </Fragment>
      </TabPanel>
      <TabPanel value={value} index={106}>
        <Fragment>
          <StyledTreeView
            nodes={data}
            title='My Styled Tree View'
            onRemove={(id) => alert(`remove id ${id}`)}
            onEdit={(id) => alert(`edit id ${id}`)}
            onAdd={(id) => alert(`add to id ${id}`)}
            onCheck={(id, checked) => console.log(`ID: ${id}, cheked: ${checked}`)}
          />
        </Fragment>
      </TabPanel>
      <TabPanel value={value} index={107}>
        <Fragment>
          <VideoView />
        </Fragment>
      </TabPanel>
      <TabPanel value={value} index={108}>
        <Fragment>
          <StyledListView
            nodes={styledList}
            title='My Styled List'
            toolbar={[
              {
                id: 1,
                seqnr: 1,
                type: 'button',
                name: 'add item',
                onClick: handleOnAddStyledItem
              }
            ]}
            onRemove={handleOnRemoveStyledList}
            onEdit={handleOnEditStyledList}
            onAdd={handleOnAddStyledItem}
            onCheck={handleOnCheckStyledList}
            onClick={handleOnItemClick}
          />
        </Fragment>
      </TabPanel>
      <TabPanel value={value} index={111}>
            <FoodsView/>
      </TabPanel>
      <TabPanel value={value} index={109}>
            <ChartsView/>
      </TabPanel>
      <TabPanel value={value} index={100}>
        <Fragment>
          <Shop setCount={setBooksCount} />
        </Fragment>
      </TabPanel>
      <TabPanel value={value} index={101}>
        <Countries countries={countries} />
      </TabPanel>
      <TabPanel value={value} index={102}>
        <CustomTableData />
      </TabPanel>
      <TabPanel value={value} index={103}>
        <AccordionData />
      </TabPanel>
      <TabPanel value={value} index={110}>
        <SimpleGrid />
      </TabPanel>


      {alphabet.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Fragment>
            <Countries firstLetter={item} countries={countries} />
          </Fragment>
        </TabPanel>
      ))
      }

      {addItem &&
        <AddItemDialog
          toggle={addItem}
          title={title}
          item={selectedNode}
          onReject={() => {
            setAddItem(false)
            setSelectedNode({ id: null, name: '', seqnr: 0 })
            setParentNode({ id: null, name: '', seqnr: 0 })
          }}
          onAccept={(value) => {
            addStyledItem(value)
            setAddItem(false)
          }}
        />
      }

      {alertItem &&
        <AlertDialog
          toggle={alertItem}
          title={title}
          question={`Do you want to remove ${selectedNode.name}, id ${selectedNode.id}`}
          onReject={() => setAlertItem(false)}
          onAccept={() => {
            removeStyledItem(selectedNode.id)
            setAlertItem(false)
          }}
        />
      }

      {showMessage &&
        <MessageDialog
          toggle={showMessage}
          onReject={() => setShowMessage(false)}
          title={title}
          message={messages}
          width='400px'
        />
      }

    </>
  )

}

export default App;
