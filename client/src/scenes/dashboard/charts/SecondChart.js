import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useTheme,Grid,Button,TextField} from "@mui/material";
import {
    PieChart,
    Legend,
    Pie,
    Cell,
    Tooltip,
  } from "recharts";
  import BoxHeader from "components/BoxHeader";
  import DashboardBox from "components/DashboardBox";

const SecondChart=()=> {
    const theme = useTheme();
    const { palette } = useTheme();
    const pieColors = [palette.primary[300], palette.primary[800]];

    const [keyword, setKeyword] = useState('data mining');
    const [university,setUniversity] = useState('University of illinois at Urbana Champaign');
    const [data, setData] = useState([]);

    const fetchData = async (k,u) => {
      try {
          const response = await axios.get('http://127.0.0.1:5000/mysql/search-publications-by-university', {
              params: {
                  keyword: k,
                  university: u
              }
          });
        setData(response.data);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    let k = (form.get("keyword").toLowerCase());
    let u = (form.get("university").toString());
    fetchData(k,u);
  };

  useEffect(() => {
      fetchData('data mining','University of illinois at Urbana Champaign');
  },[])

    return (
        <DashboardBox>
        <BoxHeader
          title="University contribution of the keyword"
          subtitle="The chart will show the number of publications in the university and keyword you enter taking in the industry."
          />
        <Grid container mt={1} px={2} rowSpacing={1} onSubmit={handleSubmit} name='form' component="form" display='flex'>
            <Grid item xs={12}>
              <TextField fullWidth type="text" name='keyword' label='Keyword' value={keyword} onChange={e => setKeyword(e.target.value)}/>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth type="text" name='university' label='University' value={university} onChange={e => setUniversity(e.target.value)}/>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant='contained'>Search</Button>
            </Grid>
            <Grid>
            <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
              <PieChart width={310} height={310}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="publications"
                  nameKey="university"
                >
                  {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={pieColors[index]} />)
                  }
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Grid>
            </Grid>
        </Grid>
      </DashboardBox>
    );
}

export default SecondChart;