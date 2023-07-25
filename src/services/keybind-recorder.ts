export default class KeybindRecorder {
    private isRecording: boolean = false;
    private callback: (shortcut: string) => void = () => { };

    constructor(callback: (shortcut: string) => void) {
        this.callback = callback;
        document.addEventListener('keydown', this.handleShortcutPress);
        this.isRecording = true;
    }

    readonly ignoredKeys = [
        'Command',
        'Control',
        'Alt',
        'Shift',
        'Meta'
    ];
    public handleShortcutPress = (event: KeyboardEvent) => {
        event.preventDefault();

        if (!this.isRecording) {
            return;
        }

        if (this.ignoredKeys.includes(event.key)) {
            console.log(`Ignored keydown: ${event.key}`);
            return;
        }

        const keys = [];

        if (event.metaKey) keys.push('Meta')
        if (event.ctrlKey) keys.push('Control');
        if (event.altKey) keys.push('Alt');
        if (event.shiftKey) keys.push('Shift');

        keys.push(event.key);
        const shortcut = keys.join('+');
        console.log(shortcut);
        document.removeEventListener('keydown', this.handleShortcutPress);
        this.isRecording = false;

        this.callback(shortcut);
    };
}