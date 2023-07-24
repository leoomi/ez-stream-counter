import * as React from 'react';
import Typography from '@mui/material/Typography';
import CounterConfiguration from "../../models/counter-configuration";

export default function Counter({configuration, counter}: {configuration: CounterConfiguration, counter: number}) {
    function buildName() {
        return configuration.text.replaceAll("%c", String(counter));
    }
    return (
        <div>
            <Typography variant="h1"
                sx = {{
                    color: configuration.color,
                    backgroundColor: configuration.background,
                }}
                >{buildName()}</Typography>
        </div>
    );
}