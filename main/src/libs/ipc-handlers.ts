import { app, BrowserWindow, ipcMain } from 'electron';

export function registerIpcHandlers(): void {
    (ipcMain as TeaIpcMain<string>).handle('getVersion', () => ({ error: false, data: app.getVersion() }));

    (ipcMain as TeaIpcMain<boolean>).handle('toggleDevTools', () => {
        const focusedWindow: BrowserWindow | null = BrowserWindow.getFocusedWindow();
        if (focusedWindow == null) {
            return { error: true, data: false, message: 'Error handling toggleDevTools no focused window' };
        }
        try {
            focusedWindow.webContents.toggleDevTools();
            return { error: false, data: true };
        } catch (err) {
            return { error: true, data: false, message: `Error handling toggleDevTools ${err instanceof Error ? err.message : ''}` };
        }
    });
}
