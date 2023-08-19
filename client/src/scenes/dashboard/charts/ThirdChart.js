import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useTheme,Grid,Box,Button,TextField} from "@mui/material";
import BoxHeader from "components/BoxHeader";
import DashboardBox from "components/DashboardBox";

const ThirdChart=()=> {
    const { palette } = useTheme();
    const [university,setUniversity] = useState('University of illinois at Urbana Champaign');
    const [data, setData] = useState([]);

    const columns= [
        {
          field: "keyword",
          headerName: "Keyword",
          flex: 1,
        },
        {
          field: "count",
          headerName: "Publication count in the university",
          flex: 1,
        },
      ];

    const fetchData = async (u) => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/neo4j/top-keywords', {
                params: {
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
        let u=(form.get("university").toString());
        fetchData(u);
    };
    useEffect(() => {
        fetchData('University of illinois at Urbana Champaign');
    },[])

    return (
        <DashboardBox>
            <BoxHeader
            title="Most popular keywords in the university"
            sideText={`${data?.length} popular keywords`}
            />
            <Grid container>
            <Grid item mt={3} xs={12} display='flex' alignItems='center' justifyContent='center'>
                <Grid onSubmit={handleSubmit} width='90%' name='form' component="form" display='flex' flexDirection='row'>
                    <TextField fullWidth type="text" name='university' label='University' value={university} onChange={e => setUniversity(e.target.value)}/>
                    <Button type="submit" variant='contained'>Search</Button>
                </Grid>
            </Grid>
            <Grid item xs={12} height="300px" display='flex' alignItems='center' justifyContent='center'>
            <Box
                height='100%'
                width='100%'
                sx={{
                    "& .MuiDataGrid-root": {
                    color: palette.grey[300],
                    border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                    borderBottom: `1px solid ${palette.grey[800]} !important`,
                    },
                    "& .MuiDataGrid-columnHeaders": {
                    borderBottom: `1px solid ${palette.grey[800]} !important`,
                    },
                    "& .MuiDataGrid-columnSeparator": {
                    visibility: "hidden",
                    },
                }}
                >
                <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.keyword}
                pageSize={10}
            />
                </Box>
                </Grid>
            </Grid>
            </DashboardBox>
    );
}

export default ThirdChart;