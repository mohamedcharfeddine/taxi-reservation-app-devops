import { useRouter } from 'next/router';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import React, { useState, useEffect } from 'react';
import { getOneProduct, deleteProduct } from '../api/appConfig';
import CardMedia from '@mui/material/CardMedia'
import { Button } from '@mui/material';
import Link from 'next/link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import RequireAdmin from 'src/@core/layouts/components/RequireAdmin';

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await getOneProduct(productId);
        setProduct(productData);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du produit :', error);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleDeleteClick = async () => {

    try {
      await deleteProduct(productId);
      
      handleDeleteSuccess();
      setTimeout(() => {
        window.location.href = '/offres/';
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la suppression du produit :', error);
    }
  };

  const handleDeleteSuccess = () => {
    setAlertOpen(true);
  };

  if (!product) {
    return <div>Chargement en cours...</div>;
  }

  const imageUrl = `${API_BASE_URL}/uploads/${product.image}`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };

  return (
    <RequireAdmin>
       <div>
  <Snackbar open={alertOpen} autoHideDuration={9000} onClose={() => setAlertOpen(false)}>
    <MuiAlert
      elevation={9}
      variant="filled"
      onClose={() => setAlertOpen(false)}
      severity="success"
    >
     The offer has been successfully deleted!
    </MuiAlert>
  </Snackbar>
      <Card style={{   margin: 'auto',maxWidth:'40rem'  }}>
      <CardContent style={{ flex: 1 , margin:'auto'}}>
      <CardMedia
        sx={{
          maxWidth:'40rem',
          margin:'auto',
        }}
        component= "img"
        src={imageUrl}
        alt={product.name}
      />
      <Typography gutterBottom variant="h5" component="div">
        {product.name_en}
      </Typography>
      <hr />
          <Typography variant="body2" color="text.secondary">
            {product.description_en}
          </Typography>


      <Link href={`/updateProduct/${product._id}`} passHref>
          <Button>Update</Button>
        </Link>
      <Button onClick={handleClickOpen}>Delete</Button>
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirmer la suppression"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        Are you absolutely sure you want to delete this offer? This action is irreversible, and the offer will be permanently removed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleDeleteClick} autoFocus>
          Agree
        </Button>
      </DialogActions>
       </Dialog>
    </CardContent>
        </Card>
     </div> </RequireAdmin>
  );
};

  export default ProductDetail;
