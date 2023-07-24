import React from 'react';
import { Button, Typography } from "@mui/material";
import { ColorResult, SketchPicker } from "react-color";

import styles from './color-picker-button.module.css';

export default function ColorPickerButton({ text, color, onColorChange }: { text: string, color: string, onColorChange: (color: ColorResult) => void}) {
    const [showPicker, setShowPicker] = React.useState(false);

    const handleButtonClick = () => {
        setShowPicker(s => !s);
    }

    return (
    <div className={styles.container}>
        <div className={styles.pickerLine}>
            <Typography>{text}</Typography>
            <div className={styles.colorPreview} style={
                { backgroundColor: color }
            }></div>
            <Button variant="contained" onClick={handleButtonClick}>
                { showPicker ? "Close color picker" : "Show color picker"}
            </Button>
        </div>
        { showPicker && <SketchPicker color={color} onChange={onColorChange} />}
    </div>);
}