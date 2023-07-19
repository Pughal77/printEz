import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import { theme } from '../style/style';

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