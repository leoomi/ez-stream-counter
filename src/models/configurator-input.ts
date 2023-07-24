import CounterConfiguration from "./counter-configuration";

export default interface ConfiguratorInput {
    configuration: CounterConfiguration;
    onSave(configuration: CounterConfiguration): void;
    onDelete(configuration: CounterConfiguration): void;
}