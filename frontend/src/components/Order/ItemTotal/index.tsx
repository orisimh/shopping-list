import { Paper, Typography, Zoom } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useCallback } from "react";

// Items Total Component
const ItemsTotal: React.FC = () => {
  const products = useSelector((state: RootState) => state.cart.products);
  const totalItems = useCallback(
    () => products.reduce((sum, product) => sum + product.quantity, 0),
    [products]
  );

  return (
    <Zoom in timeout={600}>
      <Paper 
        sx={{ 
          p: 2, 
          mb: 3, 
          textAlign: 'center',
          background: 'linear-gradient(45deg, #ec4899, #f472b6)',
          color: 'white',
          borderRadius: 3
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {/* Total: {totalItems()} products in the cart */}
          סה"כ: {totalItems()} מוצרים בסל
        </Typography>
      </Paper>
    </Zoom>
  );
};

export default ItemsTotal;