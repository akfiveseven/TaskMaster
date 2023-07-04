import * as React from 'react';
import Box from '@mui/material/Box';
import InboxTask from './InboxTask';

export default function Inbox(props) {

  console.log(props.newTaskData);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <InboxTask
        newTaskData={props.newTaskData}
        handleDelete={props.handleDelete}
        handleEdit={props.handleEdit}
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
  );
}