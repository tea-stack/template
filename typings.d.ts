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
