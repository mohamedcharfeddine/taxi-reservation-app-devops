// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react';
import { getProducts,toggleFavorite  } from 'src/pages/api/appConfig';
import PaginationComponent from 'src/views/pagination/pagination';
import RequireAdmin from 'src/@core/layouts/components/RequireAdmin';

// ** Demo Components Imports
import CardImgTop from 'src/views/cards/CardImgTop'

const CardBasic = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;
    useEffect(() => {
    async function fetchData() {
      try {


        const response = await getProducts(currentPage, limit);
        setProducts(response.products);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }

    }

    fetchData();
  }, [ currentPage]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

  };

  const handleToggleFavorite = async (productId) => {
    try {
      const response = await toggleFavorite(productId);
      console.log(response);
    } catch (error) {
      // Gérez les erreurs
      console.error(error);
    }
  };

  return (
    <RequireAdmin>
    <div>
    <Grid container spacing={2} >
  <Grid item xs={12} sx={{ paddingBottom: 10 }}>
    <Typography variant='h5'>Our Taxi Services</Typography>
  </Grid>
  {products.map((product) => (
    <Grid key={product._id} item xs={12} sm={6} md={4}>
      <CardImgTop product={product} />
    </Grid>
  ))}
</Grid>
<PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
</div>
</RequireAdmin>


  )

}

export default CardBasic
