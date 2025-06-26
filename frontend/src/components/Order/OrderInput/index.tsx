// Order Input Component
import React, { useEffect, useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "../../../redux/store";
import { addProduct, fetchCategories } from '../../../redux/cart/cartSlice';
import { Button, Card, CardContent, Fade, FormControl, InputLabel, MenuItem, Grid, Select, SelectChangeEvent, TextField, Typography, CircularProgress } from '@mui/material';
import { Add, Category, CheckCircle } from '@mui/icons-material';

const OrderInput: React.FC = () => {

  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [selectedCategoryName, setSelectedCategoryName] = useState('0');
  const [isAdding, setIsAdding] = useState(false);

//   const categories = useSelector((state: RootState) => state.cart.categories);
  const dispatch = useDispatch<AppDispatch>();

  const { categories, isLoading, isError } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    //if (categories.length === 0) {
      dispatch(fetchCategories());
   // }
  }, [dispatch, categories.length]);

  const handleAddProduct = async () => {
    if (!productName.trim() || !selectedCategory) return;

    setIsAdding(true);

    // Simulate API call with animation
    await new Promise(resolve => setTimeout(resolve, 500));

    dispatch(addProduct({
      name: productName.trim(),
      categoryId: selectedCategory,
      quantity: 1,
      categoryName: selectedCategoryName.trim()
    }));

    setProductName('');
    setSelectedCategory('0');
    setIsAdding(false);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    
    const value = event.target.value;
    setSelectedCategory(value);
    
      // Find the selected category object
    const selectedCategoryObj = categories.find(category => category.id == value);
    const selectedCategoryName = selectedCategoryObj ? selectedCategoryObj.name : '';

    setSelectedCategoryName(selectedCategoryName);
  };

  return (
    <Fade in timeout={800}>
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom sx={{  display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Add color="primary" />
            הוספת פריט
          </Typography>
          
          <Grid container spacing={3} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="שם פריט"
                variant="outlined"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                // onKeyPress={(e) => e.key === 'Enter' && handleAddProduct()}
                sx={{
                  direction: 'rtl',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    }
                  },
                  '& .MuiInputLabel-root': {
                    right: 22,
                    left: 'auto',
                    transformOrigin: 'top right',
                    '&.MuiInputLabel-shrink': {
                      // transform: 'translate(0, -9px) scale(0.75)',
                      transformOrigin: 'top right',
                      right: 30
                    }
                  },
                  '& .MuiOutlinedInput-input': {
                    textAlign: 'right',
                    direction: 'rtl'
                  },
                  '& .MuiOutlinedInput-notchedOutline legend': {
                    textAlign: 'right',
                    right: 17,

                  }
                }}
              />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {isLoading ?  
                    <CircularProgress 
                      size={25} 
                      sx={{ 
                        '& .MuiCircularProgress-circle': {
                          strokeLinecap: 'round',
                        }
                      }} 
                    /> :
              <FormControl fullWidth 
              //  dir="rtl"
                sx={{ 
                  direction: 'rtl',
                  '& .MuiInputLabel-root': {
                    right: 14,           // Position from right instead of left
                    left: 'auto',        // Remove left positioning
                    transformOrigin: 'top right', // Transform from right side
                    '&.MuiInputLabel-shrink': {
                      transform: 'translate(0, -9px) scale(0.75)',
                      transformOrigin: 'top right'
                    }
                  },
                  '& .MuiOutlinedInput-notchedOutline legend': {
                    textAlign: 'right'   // Align the legend text to right
                  }
                }}
              >
                
                <InputLabel>קטגוריה</InputLabel>
                  
                    <Select
                        value={selectedCategory}
                        label="קטגוריה"
                        onChange={handleCategoryChange}
                        startAdornment={<Category sx={{ color: 'action.active', mr: 1 }} />}
                        sx={{ 
                        borderRadius: 2,
                        '& .MuiSelect-select': {
                            textAlign: 'center',
                            direction: 'rtl'
                        },
                        '& .MuiSelect-icon': {
                          left: 7,
                          right: 'auto'
                        }
                        }}
                        MenuProps={{
                        PaperProps: {
                            sx: {
                            '& .MuiMenuItem-root': {
                                textAlign: 'center',
                                direction: 'rtl',
                                justifyContent: 'center'
                            }
                            }
                        }
                        }}
                    >
                        
                       <MenuItem 
                        key="0" 
                        value="0" 
                        disabled
                        >
                        בחר קטגוריה
                        </MenuItem> 
                        
                        {categories.map((category) => (
                        <MenuItem 
                            key={category.id} 
                            value={category.id}
                        >
                            {category.name}
                        </MenuItem>
                        ))}
                      </Select>
                  
                </FormControl>
        }
            </Grid>
            
            <Grid size={{ xs: 12, sm: 4 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleAddProduct}
                disabled={!productName.trim() || !selectedCategory || isAdding || selectedCategory === '0'}
                endIcon={isAdding ? <CheckCircle /> : <Add />}
                sx={{
                  // background: 'linear-gradient(0deg, #d9d9d9, #d3d3d3)', //'linear-gradient(45deg, #6366f1, #8b5cf6)',
                  height: 56,
                   '& .MuiButton-endIcon': {
                    // marginLeft: 10,
                    marginRight: 1
                  },
                  '&:hover': {
                    background: 'linear-gradient(45deg, #4f46e5, #7c3aed)',
                  }
                }}
              >
                {isAdding ? 'מוסיף פריט...' : 'הוסף פריט'}
              </Button>
            </Grid>
          </Grid>
          
        </CardContent>
      </Card>
    </Fade>
  );
};

export default OrderInput;