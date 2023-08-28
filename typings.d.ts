/// <reference types="electron" />

interface IpcMethods {
    getVersion(): string;
    toggleDevTools(): boolean;
    writeUserDataFile(fileName: string, fileContent: string): string;
}

interface Window {
    electronBridge?: {
        isElectronDebug: boolean;
        invokeIpc<K extends keyof IpcMethods>(channel: K, ...args: Parameters<IpcMethods[K]>): Promise<IpcResult<ReturnType<IpcMethods[K]>>>;

        /**
         * @deprecated Please use explict signatures defined in IpcMethods
         */
        invokeIpc<T = unknown>(channel: string, ...args: Array<any>): Promise<IpcResult<T>>;
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

type TsParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

declare namespace Electron {
    interface IpcMain {
        handle<K extends keyof IpcMethods>(channel: K, listener: (event: Electron.IpcMainInvokeEvent, ...args: TsParameters<IpcMethods[K]>) => Promise<IpcResult<ReturnType<IpcMethods[K]>>> | IpcResult<ReturnType<IpcMethods[K]>>): void;

        /**
         * @deprecated Please use explict signatures defined in IpcMethods
         */
        handle(channel: string, listener: (event: Electron.IpcMainInvokeEvent, ...args: Array<any>) => Promise<IpcResult<unknown>> | IpcResult<unknown>): void;
    }
}

