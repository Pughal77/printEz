import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from '@emotion/react';

import { theme } from '../style/style';


// how to use dataGrid
// define coloumns(headers) and rows
// coloumns need to be passed as an array of objects with certain properties u can see what they are
// in this link https://mui.com/x/react-data-grid/
// for rows they should be objects with the same name of properties as the fields sdefined in coloumns
// impt can use rendercell(when defining coloumns) to render jsx expressions that is show in every cell of ur table

export default function MyDataGrid({ rows, columns }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        height: 400
        }}>
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
          isRowSelectable = {() => false}
        />
      </Box>
    </ThemeProvider>
    
  );
}