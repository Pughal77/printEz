import { useEffect, useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ThemeProvider } from '@emotion/react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { theme } from '../style/style'

export default function PrinterSelect({ printer, setPrinter, setPWarning }) {
    const [printerWarning, setPrinterWarning] = useState(true);

    useEffect(() => {
        setPrinterWarning(printer == "");
        if (printer != "") {
            setPWarning(false);
        }
    }, [printer]);
    return (
        <ThemeProvider theme={theme}> 
            <Select
                sx={{
                    marginTop: '1vmin',
                    marginBottom: '1vmin',
                    borderRadius: '10px',
                    fontSize: 16, 
                    height: '5vh', 
                    backgroundColor: '#ffffff',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: 'secondary.main',
                        color: '#000000',
                    }
                }}
                labelId="printer-label"
                id="printer-select"
                value={printer}
                label=""
                onChange={(e) => setPrinter(e.target.value)}
                displayEmpty
            >
                <MenuItem value=""><em>SELECT PRINTER</em></MenuItem>
                <MenuItem value={"psc008"}>PSC008, COM1 B1</MenuItem>
                <MenuItem value={"psc011"}>PSC011, COM1 B1</MenuItem>
                <MenuItem value={"psts"}>PSTS, COM1 L1</MenuItem>
                <MenuItem value={"pstsb"}>PSTSB, COM1 L1</MenuItem>
                <MenuItem value={"pstsc"}>PSTSC, COM1 L1</MenuItem>
            </Select>
            {printerWarning && 
                <WarningAmberIcon
                    sx={{
                        marginTop: '1vmin',
                        marginBottom: '1vmin',
                        height: '5vh', 
                        color: '#ff005b'
                    }}
                />
            }
        </ThemeProvider>
    )
}