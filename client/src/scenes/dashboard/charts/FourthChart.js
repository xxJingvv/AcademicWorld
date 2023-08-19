import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useTheme,Grid,Box,Button,TextField} from "@mui/material";
import BoxHeader from "components/BoxHeader";
import DashboardBox from "components/DashboardBox";

const FourthChart=()=> {
    const { palette } = useTheme();
    const [keyword, setKeyword] = useState('data mining');
    const [data, setData] = useState([]);

    const columns= [
        {
          field: "title",
          headerName: "Publication Title",
          flex: 2,
        },
        {
            field: "year",
            headerName: "Year",
            flex: 0.5,
          },
        {
          field: "score",
          headerName: "Keyword score",
          flex: 0.5,
        },
      ];

    const fetchData = async (k) => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/mongodb/search-publications', {
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
        let k = (form.get("keyword").toLowerCase());
        fetchData(k);
    };
    useEffect(() => {
        fetchData('data mining');
    },[])

    return (
        <DashboardBox>
            <BoxHeader
            title="Publications related to the Keyword"
            sideText={`${data?.length} publications found`}
            />
            <Grid container>
            <Grid item mt={3} xs={12} display='flex' alignItems='center' justifyContent='center'>
                <Grid onSubmit={handleSubmit} width='90%' name='form' component="form" display='flex' flexDirection='row'>
                    <TextField fullWidth type="text" name='keyword' label='Keyword' value={keyword} onChange={e => setKeyword(e.target.value)}/>
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
                pageSize={100}
                getRowId={(row) => row.title}
            />
                </Box>
                </Grid>
            </Grid>
            </DashboardBox>
    );
}

export default FourthChart;