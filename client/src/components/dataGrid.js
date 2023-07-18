import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

// how to use dataGrid
// define coloums(headers) and rows
// coloumns need to be passed as an array of objects with certain properties u can see what they are
// in this link https://mui.com/x/react-data-grid/
// for rows they should be objects with the same number of properties as the number of ur headers in the table
// impt can use rendercell(when defining coloumns) to render jsx expressions that is show in every cell of ur table

export default function myDataGrid({ rows, columns }) {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}