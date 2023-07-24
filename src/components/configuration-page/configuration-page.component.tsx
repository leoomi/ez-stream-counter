import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add'
import MenuIcon from '@mui/icons-material/Menu';
import CounterConfigurator from '../configurator/configurator.component';
import Stack from '@mui/material/Stack';
import styles from './configuration-page.module.css'
import CounterFactory from '../../services/counter-factory';
import CounterConfiguration from '../../models/counter-configuration';

export default function ConfigurationPage() {
    const counterFactory: CounterFactory = new CounterFactory();
    const [counters, setCounters] = React.useState<CounterConfiguration[] | null>(null);
    const [logoClicks, setLogoClicks] = React.useState(0);

    const handleLogoclick = () => {
        setLogoClicks(c => c + 1);
    };

    const handleNewCounterClick = () => {
        const newCounter = counterFactory.create();

        setCounters(c => {
            if (c == null) {
                c = [];
            }
            return [...c, newCounter]
        });
    };

    const onSaveConfiguration = (configuration: CounterConfiguration) => {
        setCounters(previousCounters =>
            previousCounters!
                .map((c) => {
                    if (c.id === configuration.id) {
                        return configuration;
                    }
                    return c;
                })
        );
    };

    const onDeleteConfiguration = (configuration: CounterConfiguration) => {
        setCounters(previousCounters => 
            previousCounters!.filter(c => c.id !== configuration.id)
        );
    };

    React.useEffect(() => {
        if (counters == null) {
            return;
        }
        console.log('Counter configuration was saved, saving to local storage');
        localStorage.setItem("configs", JSON.stringify(counters));
    }, [counters]);

    React.useEffect(() => {
        const storedConfigs = localStorage.getItem("configs");
        if (storedConfigs == null) {
            return;
        }

        const configs: CounterConfiguration[] = JSON.parse(storedConfigs);
        setCounters(configs);
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ display: "flex", alignSelf: "center" }}>
                    <img src="/EZ.webp" className={styles.logo} onClick={handleLogoclick} />
                    {logoClicks >= 10 && <img src="/Clap.webp" className={styles.logo} />}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        EZ Stream Counter
                    </Typography>
                </Toolbar>
            </AppBar>
            <Stack sx={{ marginTop: "2vh", marginX: "3vw" }}>
                {counters && counters.map((c, idx) =>
                    <CounterConfigurator
                        key={idx}
                        configuration={c}
                        onSave={onSaveConfiguration} 
                        onDelete={onDeleteConfiguration}
                    />
                )}
                <Button variant="contained" size="large" onClick={handleNewCounterClick}>
                    <AddIcon fontSize="inherit" />
                </Button>
            </Stack>
        </Box>
    );
}
