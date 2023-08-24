/// <reference types="electron" />

interface Window {
    electronBridge?: {
        isElectron: boolean;
        isDebug: boolean,
        invokeIpc<T = unknown>(channel: string, ...args: Array<unknown>): Promise<IpcResult<T>>,
    }
}

type IpcResult<T> = IpcSuccessResult<T> | IpcFailResult<T>

interface IpcSuccessResult<T> {
    error: false;
    data: T;
}

interface IpcFailResult<T> {
    error: true;
    data: T | null;
    message?: string;
}

interface TeaIpcMain<T> extends Electron.IpcMain {
    handle(channel: string, listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => Promise<IpcResult<T>> | IpcResult<T>): void;
}

