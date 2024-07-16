// export default SecondPage
// ** Next Imports
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Third Party Components
import axios from 'axios'

// ** Type Import
import { PricingDataType } from 'src/@core/components/plan-details/types'
import ConnectionsComponent from 'src/views/pages/connections/ConnectionsComponent'

const DialogExamples = () => (
  <Grid container spacing={6} className='match-height'>
    <Grid item md={3.2} sm={6} xs={12}>
      <ConnectionsComponent />
    </Grid>
    <Grid item md={3.2} sm={6} xs={12}>
      {/* <DialogAddCard /> */}
    </Grid>
  </Grid>
)

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await axios.get('/')
//   const data: PricingDataType = res.data

//   return {
//     props: {
//       apiPricingPlanData: data.pricingPlans
//     }
//   }
// }

export default DialogExamples
