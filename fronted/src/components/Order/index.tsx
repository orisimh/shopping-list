import { Alert, AlertTitle, Box, Container } from "@mui/material";
import Header from "./Header";
import OrderInput from "./OrderInput";
import ItemsTotal from "./ItemTotal";
import OrderGrid from "./OrderGrid";
import FinishOrder from "./FinishOrder";    
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Main App Component
const Order: React.FC = () => {

  const {isError}  = useSelector((state: RootState) => state.cart);

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
       {isError && 
          <Alert severity="error">
            <AlertTitle>שגיאה</AlertTitle>
            {isError}
          </Alert>
        }
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <OrderInput />
        <ItemsTotal />
        <OrderGrid />
        <FinishOrder />
      </Container>
    </Box>
  );
};

export default Order;