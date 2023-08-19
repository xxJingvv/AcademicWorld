import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useTheme,Grid,Button,TextField} from "@mui/material";
import {
    ResponsiveContainer,
    CartesianGrid,
    AreaChart,
    XAxis,
    YAxis,
    Tooltip,
    Area,
  } from "recharts";
  import BoxHeader from "components/BoxHeader";
  import DashboardBox from "components/DashboardBox";

const FirstChart=()=> {
    const { palette } = useTheme();
    const [keyword, setKeyword] = useState('data mining');
    const [data, setData] = useState([]);

    const fetchData = async (k) => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/mongodb/search-keyword-publications', {
                params: {
                    keyword: k
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
        let k=(form.get("keyword").toLowerCase());
        fetchData(k);
    };

    useEffect(() => {
        fetchData('data mining');
    },[])

    return (
        <DashboardBox>
        <BoxHeader
          title="The Trend of Keyword in Publications"
          subtitle="Input the keyword you want to search, and the chart will show the number publications related to this keyword in history."
          />
        <Grid container>
            <Grid item mt={3} xs={12} display='flex' alignItems='center' justifyContent='center'>
            <Grid onSubmit={handleSubmit} name='form' component="form" display='flex' flexDirection='row'>
                <TextField type="text" name='keyword' label='Keyword' value={keyword} onChange={e => setKeyword(e.target.value)}/>
                <Button type="submit" variant='contained'>Search</Button>
            </Grid>
            </Grid>
            <Grid item mt={3} xs={12} display='flex' alignItems='center' justifyContent='center'>
            <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data} margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 30,
            }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={palette.primary[300]}  stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="year" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
            </ResponsiveContainer>
            </Grid>
        </Grid>
      </DashboardBox>
    );
}

export default FirstChart;