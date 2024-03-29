import { app, BrowserWindow, ipcMain } from 'electron';
import { promises as fs } from 'node:fs';
import * as path from 'node:path';

/**
 * register ipc handle callback functions
 * @description Please define the ipc handlers in `typings.d.ts` first to make it strict in both `app` and `main`
 */
export function registerIpcHandlers(): void {
    ipcMain.handle('getVersion', () => ({ ok: true, data: app.getVersion() }));

    ipcMain.handle('getElectronVersion', () => ({ ok: true, data: process.versions.electron }));

    ipcMain.handle('toggleDevTools', () => {
        const focusedWindow: BrowserWindow | null = BrowserWindow.getFocusedWindow();
        if (focusedWindow == null) {
            return { ok: false, data: false, message: 'Error handling toggleDevTools no focused window' };
        }
        try {
            focusedWindow.webContents.toggleDevTools();
            return { ok: true, data: true };
        } catch (err) {
            return { ok: false, data: false, message: `Error handling toggleDevTools ${err instanceof Error ? err.message : ''}` };
        }
    });

    ipcMain.handle('writeUserDataFile', async (_, fileName: string, fileContent: string) => {
        const targetFilePath: string = path.join(app.getPath('userData'), fileName);
        await fs.writeFile(targetFilePath, fileContent, { encoding: 'utf8' });
        return { ok: true, data: targetFilePath };
    });
}
