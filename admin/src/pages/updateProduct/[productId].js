import React, { useState, useEffect } from 'react';
import { getOneProduct, updateProduct } from '../api/appConfig';
import { useRouter } from 'next/router';
import RequireAdmin from 'src/@core/layouts/components/RequireAdmin';
import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';

function UpdateProduct() {

  const router = useRouter();
  const { productId } = router.query;

  const [formData, setFormData] = useState({
    name_fr: '',
    name_en: '',
    name_fl: '',
    description_fr: '',
    description_en: '',
    description_fl: '',
    image: null,
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const formData = await getOneProduct(productId);
        setFormData(formData);
        console.log(formData)
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du produit :', error);
      }
    }

    fetchProduct();
  }, [productId]);


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {

        return;
      }


      const updatedProduct = await updateProduct(productId, formData, accessToken);
      window.location.href = `/offres/${productId}`;
        console.log('Produit mis à jour avec succès :',  updatedProduct);

    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit :', error);


    }
  }

  return (
    <RequireAdmin>

    <Card>
      <CardHeader title='Update'  titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={5} >
        <Grid item xs={12}>
        <TextField
                fullWidth
                label="Name (fr)"
                placeholder="Product Name (French)"
                name="name_fr"
                value={formData.name_fr}
                onChange={handleFormChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Name (en)"
                placeholder="Product Name (English)"
                name="name_en"
                value={formData.name_en}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Name (fl)"
                placeholder="Product Name (Flamend)"
                name="name_fl"
                value={formData.name_fl}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Description (fr)"
                placeholder="Product Description (French)"
                name="description_fr"
                value={formData.description_fr}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Description (en)"
                placeholder="Product Description (English)"
                name="description_en"
                value={formData.description_en}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Description (fl)"
                placeholder="Product Description (Flamend)"
                name="description_fl"
                value={formData.description_fl}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        </Grid>
         <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'>
                Update Product
              </Button>
            </Grid>
        </Grid>
      </form>
      </CardContent>
    </Card>
    </RequireAdmin>
  );
}

export default UpdateProduct;
