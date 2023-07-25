import React from 'react';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

export default function ShorcutListener() {
    return (
        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Increment shortcut</InputLabel>
            <OutlinedInput
                disabled
                id="outlined-adornment-password"
                endAdornment={
                    <InputAdornment position="end">
                        <Button variant="contained">Record</Button>
                    </InputAdornment>
                }
                label="Increment"
            />
        </FormControl>
    );
}