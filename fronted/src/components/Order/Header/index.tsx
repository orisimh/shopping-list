import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Badge,
  AppBar,
  Toolbar,
} from '@mui/material';

import {
  ShoppingCart,
  LocalMall
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from "../../../redux/store";


// Header Component
const  Header: React.FC = () => {
  const products = useSelector((state: RootState) => state.cart.products);
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        color: 'primary.main'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LocalMall sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: 'primary.main' }}>
            ShopCart Pro
          </Typography>
        </Box>
        
        <Badge 
          badgeContent={totalItems} 
          color="secondary"
          sx={{
            '& .MuiBadge-badge': {
              right: -3,
              top: 13,
              border: '2px solid white',
              padding: '0 4px',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }
          }}
        >
          <ShoppingCart sx={{ fontSize: 28, color: 'primary.main' }} />
        </Badge>
      </Toolbar>
    </AppBar>
  );
};

export default Header;