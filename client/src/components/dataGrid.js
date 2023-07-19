import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import { theme } from '../style/style';


// how to use dataGrid
// define coloums(headers) and rows
// coloumns need to be passed as an array of objects with certain properties u can see what they are
// in this link https://mui.com/x/react-data-grid/
// for rows they should be objects with the same number of properties as the number of ur headers in the table
// impt can use rendercell(when defining coloumns) to render jsx expressions that is show in every cell of ur table

export default function MyDataGrid({ rows, columns }) {

/*
const columns = [
  { field: 'id', headerName: 'No.', width: 100 },
  {
    field: 'fileName',
    headerName: 'File name',
    width: 500,
    editable: true,
  }
];

const rows = [
  { id: 1, fileName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, fileName: 'Lannister', firstName: 'Cersei', age: 42 }
];

export default function DataGridDemo() {
*/
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: 400}}>
        <DataGrid
          sx={{backgroundColor: "#FFFFFF"}}
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
    </ThemeProvider>
    
  );
}