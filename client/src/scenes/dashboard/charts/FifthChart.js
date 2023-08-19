import React, { useState, useEffect } from 'react';
import { DataGrid} from "@mui/x-data-grid";
import { useTheme,Grid,Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from 'axios';
import BoxHeader from "components/BoxHeader";
import DashboardBox from "components/DashboardBox";

function FifthChart(props) {
    const [publicationName, setPublicationName] = useState('Data reduction: sampling');
    const [keywords, setKeywords] = useState([]);
    const [open, setOpen] = useState(false); // For dialog box
    const [newKeyword, setNewKeyword] = useState('');
    const { palette } = useTheme();

    const columns = [
        { field: 'name', headerName: 'Keyword', flex: 2 },
        {
            field: 'delete',
            headerName: 'Action',
            sortable: false,
            flex:0.5,
            disableClickEventBubbling: true,
            renderCell: (params) => (
                <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row)}>
                    Delete
                </Button>
            ),
        },
    ];
    const fetchKeywords = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/publications/keywords', {
                params: { name: publicationName },
            });
            setKeywords(response.data);
        } catch (error) {
            console.error("Error fetching keywords:", error);
        }
    };
    const handleDelete = async (row) => {
        try {
            await axios.post('http://127.0.0.1:5000/publications/keywords/delete', {
                name: publicationName,
                keyword: row,
            });
            fetchKeywords();
        } catch (error) {
            console.error("Error deleting keyword:", error);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleAddKeyword = async () => {
        try {
            await axios.post('http://127.0.0.1:5000/publications/keywords/add', {
                name: publicationName,
                keyword: { name: newKeyword },
            });
            setNewKeyword('');
            handleClose();
            fetchKeywords();
        } catch (error) {
            console.error("Error adding keyword:", error);
        }
    };


    return (
        <DashboardBox>
            <BoxHeader
            title="Manage Keywords of a Publication"
            sideText={`${keywords?.length} keywords found`}
            />
            <Grid container>
                <Grid item mt={3} px={3} xs={12} display='flex' alignItems='center' justifyContent='center'>
                <TextField
                    label="Publication Name"
                    value={publicationName}
                    onChange={(e) => setPublicationName(e.target.value)}
                    fullWidth
                />
                <Button onClick={fetchKeywords}>Fetch Keywords</Button>
                <Button color="primary" onClick={() => setOpen(true)}>Add Keyword</Button>
                </Grid>
                <Grid item mt={3} px={3} xs={12} height="300px" display='flex' alignItems='center' justifyContent='center'
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
                columns={columns}
                pageSize={10}
                getRowId={(row) => row.name}
            />
                <Dialog
                open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Keyword</DialogTitle>
                    <DialogContent sx={{backgroundColor: palette.grey[900]}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Keyword"
                            fullWidth
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleAddKeyword} color="primary">Add</Button>
                    </DialogActions>
                </Dialog>
                    </Grid>
            </Grid>
        </DashboardBox>

    );
}

export default FifthChart;