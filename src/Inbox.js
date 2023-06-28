import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  //{ field: 'taskID', headerName: 'ID', width: 90 },
  {
    field: 'taskName',
    headerName: 'Task Name',
    disableColumnMenu: true,
    sortable: false,
    width: 150,
    editable: false,
  },
  {
    field: 'taskDesc',
    sortable: false,
    disableColumnMenu: true,
    headerName: 'Task Description',
    width: 150,
    editable: false,
  },
  {
    field: 'taskPriority',
    sortable: false,
    disableColumnMenu: true,
    headerName: 'Priority',
    width: 110,
    editable: false,
  },
  {
    field: 'taskStartDate',
    headerName: 'Due Date',
    disableColumnMenu: true,
    sortable: false,
    width: 110,
    editable: false,
  },
  {
    field: 'taskCategory',
    disableColumnMenu: true,
    sortable: false,
    headerName: 'Category',
    width: 110,
    editable: false,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];


export default function DataGridDemo(props) {

  console.log(props.newTaskData);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.newTaskData}
        columns={columns}
        getRowId={(row) => row.taskID}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}