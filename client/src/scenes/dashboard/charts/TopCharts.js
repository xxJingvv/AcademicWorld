import React, { useState,useEffect } from 'react';
import { Grid, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import DashboardBox from "components/DashboardBox";
import axios from 'axios';

const TopCharts =()=> {
    const { palette } = useTheme();
    const [keywords, setKeywords] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [faculty, setFaculty] = useState([]);

    const columns1 =[
        { field: 'name', headerName: 'Keywords', flex: 2 }
    ]
    const columns2 =[
        { field: 'name', headerName: 'Universities', flex: 2 }
    ]
    const columns3 =[
        { field: 'name', headerName: 'Faculty', flex: 2 }
    ]

    useEffect(() => {
        async function fetchKeywords() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/mysql');
                setKeywords(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        async function fetchUniversities() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/neo4j');
                setUniversities(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        async function fetchFaculty() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/mongodb');
                setFaculty(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchKeywords()
        fetchUniversities()
        fetchFaculty()
    }, []);

    return (
        <Grid container>
            <Grid item xs={4}>
            <DashboardBox>
            <Grid item px={3} xs={12} height="300px" display='flex' alignItems='center' justifyContent='center'
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
                                "& .MuiDataGrid-cell--editing": {
                                color: palette.grey[300],
                                backgroundColor: `${palette.grey[900]} !important`,
                                }
                            }}>
                            <DataGrid
                            height="100%"
                            rows={keywords}
                            columns={columns1}
                            pageSize={100}
                            pagination
                            pageSizeOptions={false}
                            getRowId={(row) => row.name}
                        />
                        </Grid>
            </DashboardBox>
            </Grid>
            <Grid item xs={4}>
            <DashboardBox>
            <Grid item px={3} xs={12} height="300px" display='flex' alignItems='center' justifyContent='center'
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
                                "& .MuiDataGrid-cell--editing": {
                                color: palette.grey[300],
                                backgroundColor: `${palette.grey[900]} !important`,
                                }
                            }}>
                            <DataGrid
                            height="100%"
                            rows={universities}
                            columns={columns2}
                            pageSize={10}
                            pageSizeOptions={false}
                            getRowId={(row) => row.name}
                        />
                        </Grid>
            </DashboardBox>
            </Grid>
            <Grid item xs={4}>
            <DashboardBox>
            <Grid item px={3} xs={12} height="300px" display='flex' alignItems='center' justifyContent='center'
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
                                "& .MuiDataGrid-cell--editing": {
                                color: palette.grey[300],
                                backgroundColor: `${palette.grey[900]} !important`,
                                }
                            }}>
                            <DataGrid
                            height="100%"
                            rows={faculty}
                            columns={columns3}
                            pageSize={10}
                            pageSizeOptions={false}
                            getRowId={(row) => row.name}
                        />
                        </Grid>
            </DashboardBox>
            </Grid>
        </Grid>
    );
}

export default TopCharts;