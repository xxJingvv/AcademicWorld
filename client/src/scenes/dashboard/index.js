import { Grid,Box} from "@mui/material";
import FirstChart from "./charts/FirstChart";
import SecondChart from "./charts/SecondChart";
import ThirdChart from "./charts/ThirdChart";
import FourthChart from "./charts/FourthChart";
import FifthChart from "./charts/FifthChart";
import SixthChart from "./charts/SixthChart";
import TopCharts from "./charts/TopCharts";



const Dashboard = () => {
  return (
    <Box>
        <Grid container rowSpacing={3} pt={2}>
          <TopCharts/>
          <Grid item xs={12} md={8}>
            <FirstChart/>
           </Grid>
           <Grid item xs={12} md={4}>
            <SecondChart/>
           </Grid>
           <Grid item xs={12} md={6}>
            <ThirdChart/>
           </Grid>
           <Grid item xs={12} md={6}>
            <FourthChart/>
           </Grid>
           <Grid item xs={12} md={6}>
            <FifthChart/>
           </Grid>
           <Grid item xs={12} md={6}>
            <SixthChart/>
           </Grid>
        </Grid>
    </Box>
  );
};

export default Dashboard;