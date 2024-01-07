// ** MUI Imports
import Grid from '@mui/material/Grid'
import RequireAdmin from 'src/@core/layouts/components/RequireAdmin';

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const FormLayouts = () => {


  return (
    <RequireAdmin>

    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <FormLayoutsBasic />
        </Grid>

      </Grid>
    </DatePickerWrapper>

    </RequireAdmin>
  );
}

export default FormLayouts
