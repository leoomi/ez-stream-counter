import React from 'react';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import KeybindRecorder from '../../services/keybind-recorder';

interface ShortcutListenerInput {
    onChange: (result: string) => void;
}

export default function ShorcutListener({ onChange }: ShortcutListenerInput) {
    const handleRecordClick = () => {
        new KeybindRecorder((keybind) => {
            onChange(keybind);
        });
    };

    return (
        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Increment shortcut</InputLabel>
            <OutlinedInput
                disabled
                id="outlined-adornment-password"
                endAdornment={
                    <InputAdornment position="end">
                        <Button variant="contained" onClick={handleRecordClick}>Record</Button>
                    </InputAdornment>
                }
                label="Increment"
            />
        </FormControl>
    );
}