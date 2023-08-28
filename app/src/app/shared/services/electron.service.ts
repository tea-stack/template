import { Injectable, isDevMode } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ElectronService {

    public async invokeIpc<K extends keyof IpcMethods>(channel: K, ...args: Parameters<IpcMethods[K]>): Promise<IpcResult<ReturnType<IpcMethods[K]>>>;

    /**
     * ***DEPRECATED*** invokeIpc
     * @deprecated Please use explict signatures defined in IpcMethods
     */
    // eslint-disable-next-line no-dupe-class-members
    public async invokeIpc<T>(channel: string, ...args: Array<unknown>): Promise<IpcResult<T>> {
        if (!window.electronBridge) {
            const ipcRes: IpcFailResult<T> = {
                error: true,
                data: null,
                message: `Error invoking remote method '${channel}': No electronBridge detected`,
            };
            if (isDevMode()) {
                console.error(ipcRes.message);
            }
            return ipcRes;
        }
        const ipcRes: IpcResult<T> = await window.electronBridge.invokeIpc<T>(channel, ...args).catch(err => ({
            error: true,
            data: null,
            message: err instanceof Error ? err.message : `Error invoking remote method '${channel}'`,
        }));
        if (ipcRes.error && (isDevMode() || window.electronBridge.isElectronDebug)) {
            console.error(ipcRes.message);
        }
        return ipcRes;
    }

}
