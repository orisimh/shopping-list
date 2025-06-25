import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Box, Card, CardContent, Chip, Fade, Grid, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Product } from "../../../types/Item";


const OrderGrid: React.FC = () => {

  const products = useSelector((state: RootState) => state.cart.products);
  
  // console.log('Products:', products);
  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.categoryName]) {
      acc[product.categoryName] = [];
    }
    acc[product.categoryName].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const categories = Object.keys(productsByCategory);

  if (categories.length === 0) {
    return (
      <Fade in timeout={1000}>
        <Card sx={{ textAlign: 'center', py: 8 }}>
          <CardContent>
            <ShoppingCart sx={{ fontSize: 64, color: 'action.disabled', mb: 2 }} />
            <Typography variant="h6" color="textSecondary">
              הסל שלך ריק
            </Typography>
            <Typography variant="body2" color="textSecondary">
              הוסף פריטים לסל כדי להתחיל!
            </Typography>
          </CardContent>
        </Card>
      </Fade>
    );
  }

  return (
    <Grid container spacing={3}>
      {categories.map((category, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category}>
          <Fade in timeout={800 + index * 200}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <CardContent>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 'bold',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    pb: 1,
                    mb: 2
                  }}
                >
                  {category}
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {productsByCategory[category].map((product) => (
                    <Chip
                      // key={product.id}
                      label={`${product.name} ${product.quantity > 1 ? `(${product.quantity})` : ''}`}
                      variant="outlined"
                      sx={{
                        justifyContent: 'flex-start',
                        '& .MuiChip-label': {
                          fontSize: '0.875rem',
                          fontWeight: 500
                        },
                        borderColor: 'primary.light',
                        color: 'primary.dark',
                        '&:hover': {
                          backgroundColor: 'primary.light',
                          color: 'white'
                        }
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderGrid;