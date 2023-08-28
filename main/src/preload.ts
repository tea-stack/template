import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronBridge', {
    isElectronDebug: process.argv.includes('--isElectronDebug'.toLowerCase()),
    invokeIpc: async (channel: string, ...args: Array<unknown>) => ipcRenderer.invoke(channel, ...args),
});
