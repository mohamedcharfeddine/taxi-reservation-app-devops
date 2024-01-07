// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableCollapsible from 'src/views/tables/TableCollapsible'
import RequireAuth from 'src/@core/layouts/components/RequireAuth'

const MUITable = () => {
  return (
    <RequireAuth>
    <Grid container spacing={6}>
      <Grid item xs={'12'}>
        <Card>
          <CardHeader title='Booking Control Center' titleTypographyProps={{ variant: 'h6' }} />
          <TableCollapsible />
        </Card>
      </Grid>
    </Grid>
    </RequireAuth>
  )
}

export default MUITable
