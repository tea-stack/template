import { app, BrowserWindow } from 'electron';
import * as path from 'node:path';
import { registerIpcHandlers } from './libs';

const isDebug: boolean = process.argv.includes('--debug');
const isServe: boolean = process.argv.includes('--serve');
const isElectronV22: boolean = process?.versions?.electron?.startsWith('22') ?? false;

async function createMainWindow(): Promise<void> {
    const mainWindow: BrowserWindow = new BrowserWindow({
        width: 1260,
        height: 810,
        frame: isElectronV22,
        titleBarStyle: isElectronV22 ? 'default' : 'hidden',
        // eslint-disable-next-line multiline-ternary
        titleBarOverlay: isElectronV22 ? false : {
            color: '#00000000',
            symbolColor: 'rgba(207, 207, 207, 0.9)',
            height: 29,
        },
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            additionalArguments: [isDebug ? '--isElectronDebug' : ''],
        },
    });

    if (isElectronV22) {
        mainWindow.removeMenu();
    }

    await (isServe ? mainWindow.loadURL('http://localhost:4200') : mainWindow.loadFile(path.join(__dirname, '../app/index.html')));

    if (isDebug) {
        mainWindow.webContents.openDevTools();
    }
}

async function main(): Promise<void> {
    const singleInstanceLock: boolean = app.requestSingleInstanceLock();
    if (!singleInstanceLock) {
        app.quit();
        return;
    }

    app.on('second-instance', () => {
        const allWindows: Array<BrowserWindow> = BrowserWindow.getAllWindows();
        if (allWindows.length > 0) {
            const firstWindow: BrowserWindow | undefined = allWindows[0];
            if (firstWindow?.isMinimized() ?? false) {
                firstWindow?.restore();
            } else {
                firstWindow?.focus();
            }
        }
    });

    await app.whenReady();

    registerIpcHandlers();

    await createMainWindow();
}

main().catch(error => { console.error(error); });
