import React from 'react';
import { useParams } from 'react-router-dom';
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import Typography from '@mui/material/Typography';
import Counter from "../counter/counter.component";
import CounterConfiguration from '../../models/counter-configuration';

export default function CounterPage() {
    const { id } = useParams<{ id: string }>();
    const [configuration, setConfiguration] = React.useState<CounterConfiguration | null>(null);
    const [counter, setCounter] = React.useState(0);
    const [status, setStatus] = React.useState<string>("");

    React.useEffect(() => {
        setupConfiguration();
        window.addEventListener("keypress", handleKeyPress);
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("keypress", handleKeyPress);
            window.addEventListener("storage", handleStorageChange);
        }
    }, []);

    const setupConfiguration = () => {
         const storedConfigs = localStorage.getItem("configs");
        if (storedConfigs == null) {
            setStatus("No configs were found. Close this window and configure a new counter.");
            return;
        }

        const configs: CounterConfiguration[] = JSON.parse(storedConfigs);
        const filteredConfigs = configs.filter(c => c.id === id);
        if (filteredConfigs.length == 0) {
            setStatus("The configuration for this counter was not found. Close this window and configure a new counter.");
            return;
        }

        setStatus("");
        setConfiguration(filteredConfigs[0]);
        setCounter(getCounter());
    };

    const getCounter = (): number => {
        const storedItem = localStorage.getItem(id!);
        if (!storedItem) {
            return 0;
        } 
          return Number(storedItem);
    }

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === '-') {
            updateCounter(-1);
        }
      
        if (event.key === '+') {
            updateCounter(1);
        }
    };

    const handleStorageChange = (event: StorageEvent) => {
        if (event.key === "configs") {
            setupConfiguration();
            return;
        }

        if (event.key === id) {
            setCounter(Number(event.newValue));
            return;
        }
    };

    const updateCounter = (amount: number) => {
        let counter = getCounter();

        counter = counter + amount;
        localStorage.setItem(id!, String(counter))
        setCounter(counter);
    };

    if (status !== "") {
        return <Typography><ReportProblemIcon/>{status}</Typography>
    }

    return configuration && <Counter configuration={configuration!} counter={counter}/>
}