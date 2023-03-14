
//import './App.css';

import { useState, useEffect } from 'react';
import { Basket, GoodsList, Search, Header, Snack } from '../components';
import { goods } from '../data/goods';
import { Container } from '@mui/material';

function App({setCount=Function.prototype}) {

  const [order, setOrder] = useState([]);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSnackOpen, setSnackOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(0);

  useEffect(() => {

    goods.map(item => {
      item.checked = false;
      return item;
    })

    setProducts(goods)
    setCount(goods.length)

  }, []);

  const onCheckboxChanged = (e, id) => {

    setProducts(prev => prev.map(item => {
      if(item.id === id){
        item.checked = e.target.checked;
      }

      return item;
    }))
  }

  const handleChange = (e) => {
    if (!e.target.value) {
      setProducts(goods);
      setSearch('');
      return;
    }

    setSearch(e.target.value);
    setProducts(
      products.filter((good) =>
        good.name.toLowerCase().includes(e.target.value.toLowerCase())
      ))
  };

  const addToOrder = (goodsItem) => {
    let quantity = 1;

    const indexInOrder = order.findIndex(
      (item) => item.id === goodsItem.id
    );

    if (indexInOrder > -1) {
      quantity = order[indexInOrder].quantity + 1;

      setOrder(order.map((item) => {
        if (item.id !== goodsItem.id) return item;

        return {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity,
        };
      }),
      );
    } else {
      setOrder([
        ...order,
        {
          id: goodsItem.id,
          name: goodsItem.name,
          price: goodsItem.price,
          quantity,
        },
      ],
      );
    }

    setOrderQuantity(prev => prev + 1);
    setSnackOpen(true);
  };

  const removeFromOrder = (goodsItem) => {

    setOrder(order.filter((item) =>{
      if(item.id !== goodsItem){
        return item;
      }else{
          setOrderQuantity(prev => prev - item.quantity)
          
        }
        
    } ));
    
  };

  return (
    <>
      <Header 
        handleCart={() => setCartOpen(true)}
        orderCount={orderQuantity}
      />
      <Container
        sx={{mt: '1rem'}}
      >
        <Search
          value={search}
          onChange={handleChange}
        />

       {/*  <Toolbar
          buttons={[
            {id:1, seqnr: 1, type: 'img', name:'export', image: '/img/48/system-switch-user.png', onClick: handleOnExport}
          ]}
        /> */}
        <GoodsList
          goods={products}
          onCheckboxChanged={onCheckboxChanged}
          setOrder={addToOrder}
        />
        {/* <BasketList
          order={order}
          setOrder={removeFromOrder}
        /> */}
      </Container>
      <Basket 
        order={order}
        removeFromOrder={removeFromOrder}
        cartOpen={isCartOpen}
        closeCart={() => setCartOpen(false)}
      />
      <Snack
        isOpen={isSnackOpen}
        handleOnClose={() => setSnackOpen(false)}
      />
    </>
  );
}

export default App;
