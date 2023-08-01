import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronBridge', {
    isElectron: Reflect.has(process.versions, 'electron'),
    isDebug: process.argv.findIndex(arg => arg.toLowerCase() == '--isdebug') >= 0,
    invokeIpc: async (channel: string, ...args: Array<unknown>) => ipcRenderer.invoke(channel, ...args),
});
