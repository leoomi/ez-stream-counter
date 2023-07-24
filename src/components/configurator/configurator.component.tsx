import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LaunchIcon from '@mui/icons-material/Launch';
import Stack from '@mui/material/Stack';
import Item from '@mui/system'
import { ColorResult, SketchPicker } from 'react-color';
import { RGBAToHex } from '../../services/color';
import CounterConfiguration from '../../models/counter-configuration';
import styles from './configurator.module.css'
import Counter from '../counter/counter.component';
import ConfiguratorInput from '../../models/configurator-input';
import { BrowserWindow } from 'electron';
import ColorPickerButton from '../color-picker-button/color-picker-button';

// TODO break this component down.
export default function Configurator({ configuration, onSave, onDelete }: ConfiguratorInput) {
    const [expanded, setExpanded] = React.useState(false);
    const [previewConfig, setPreviewConfig] = React.useState(configuration);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPreviewConfig((previousState) => {
            return {
                ...previousState,
                [name]: value,
            }
        });
    };

    const onAccordionChange = (_: React.SyntheticEvent, expanded: boolean) => {
        if (!expanded) {
            resetConfiguration();
        }

        setExpanded(expanded);
    };

    const handleLaunchClick = () => {
        window.open(`http://localhost:3000/counter/${configuration.id}`, '_blank', 'frame=false,transparent=true');
    };

    const resetConfiguration = () => {
        setPreviewConfig(configuration);
    };

    const handleSaveClick = () => {
        onSave(previewConfig);
        setExpanded(false);
    };

    const handleDeleteClick = () => {
        onDelete(previewConfig);
        setExpanded(false);
    }

    const handleColorChange = (property: string, value: ColorResult) => {
        setPreviewConfig((previousState) => {
            return {
                ...previousState,
                [property]: RGBAToHex(value.rgb),
            }
        });
    }

    return (
        <Accordion
            sx={{ marginBottom: "16px" }}
            expanded={expanded}
            onChange={onAccordionChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{configuration.name}</Typography>
                <LaunchIcon onClick={handleLaunchClick} />
            </AccordionSummary>
            <AccordionDetails>
                <Typography>Configuration:</Typography>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}>
                    <TextField id="name" name="name" label="Name" value={previewConfig.name} onChange={handleChange} />
                    <TextField id="text" name="text" label="Text" value={previewConfig.text} onChange={handleChange} />
                    <ColorPickerButton text="Font Color" color={previewConfig.color} onColorChange={(color) => handleColorChange("color", color)} />
                    <ColorPickerButton text="Background Color" color={previewConfig.background} onColorChange={(color) => handleColorChange("background", color)} />
                    <Button variant="contained" onClick={handleSaveClick}>Save</Button>
                    <Button
                        sx={{
                            marginLeft: "8px"
                        }}
                        variant="outlined"
                        startIcon={<DeleteIcon/>}
                        onClick={handleDeleteClick}>
                            Delete
                    </Button>
                </Box>
                <Typography variant='h5'>
                    Preview:
                </Typography>
                <div className={styles.preview}>
                    <Counter configuration={previewConfig} counter={0} />
                </div>
            </AccordionDetails>
        </Accordion>
    );
}
