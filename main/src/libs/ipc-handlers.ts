import { app, BrowserWindow, ipcMain } from 'electron';

export function registerIpcHandlers(): void {
    ipcMain.handle('getVersion', () => ({ error: false, data: app.getVersion() }));

    ipcMain.handle('toggleDevTools', () => {
        BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools();
    });
}
