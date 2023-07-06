import * as React from 'react';
import Box from '@mui/material/Box';
import InboxTask from './InboxTask';
import DashboardTask from './DashboardTask';

export default function Dashboard(props) {

  return (
    <>
    <Box sx={{ height: 400, width: '100%' }}>
      <DashboardTask
        newTaskData={props.newTaskData}
        handleDelete={props.handleDelete}
        handleEdit={props.handleEdit}
        checked={props.checked}
        handleToggle={props.handleToggle}
      />
      {/* <DataGrid
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
      /> */}
    </Box>
    </>
  );
}