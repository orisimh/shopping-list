import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { useState } from "react";
import { clearCart, createOrder } from "../../../redux/cart/cartSlice";
import { Box, Button, CircularProgress, Fade } from "@mui/material";



// Finish Order Component
const FinishOrder: React.FC = () => {

  const {products, isLoading}  = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const handleFinishOrder = async () => {
    
    const result = await dispatch(createOrder(products)).unwrap(); 
    alert(`הזמנה מספר ${result.id} נוצרה בהצלחה!`);
    dispatch(clearCart());
    
  };

  if (products.length == 0) return null;

   return (
     <>
        
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleFinishOrder}
              disabled={isLoading}
              endIcon={
                  isLoading ? (
                    <CircularProgress 
                      size={20} 
                      sx={{ 
                        color: 'white',
                        '& .MuiCircularProgress-circle': {
                          strokeLinecap: 'round',
                        }
                      }} 
                    />
                  ) : <></>
              }
              
              sx={{
                background: 'linear-gradient(45deg, #10b981, #059669)',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                '&:hover': {
                  background: 'linear-gradient(45deg, #059669, #047857)',
                }, '& .MuiButton-endIcon': {
                    marginRight: 1
                  },
              }}
            >
              {isLoading ? 'יוצר הזמנה..' : 'סיים הזמנה'}
            </Button>
          </Box>
        </Fade>
       
     </>
   );
};

export default FinishOrder;
