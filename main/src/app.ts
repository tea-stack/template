import { app, BrowserWindow } from 'electron';
import * as path from 'node:path';
import { registerIpcHandlers } from './libs';

const isDebug: boolean = process.argv.includes('--debug');
const isServe: boolean = process.argv.includes('--serve');

async function createMainWindow(): Promise<void> {
    const mainWindow: BrowserWindow = new BrowserWindow({
        width: 900,
        height: 630,
        frame: false,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: process.versions.electron.startsWith('22') ? '' : '#00000000',
            symbolColor: 'rgba(207, 207, 207, 0.9)',
            height: 29,
        },
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            additionalArguments: [isDebug ? '--isElectronDebug' : ''],
        },
    });

    await (isServe ? mainWindow.loadURL('http://localhost:4200') : mainWindow.loadFile(path.join(__dirname, '../app/browser/index.html')));

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
            const firstWindow: BrowserWindow = allWindows[0];
            if (firstWindow.isMinimized()) {
                firstWindow.restore();
            } else {
                firstWindow.focus();
            }
        }
    });

    await app.whenReady();

    registerIpcHandlers();

    await createMainWindow();
}

main().then().catch(() => { });
