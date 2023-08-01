import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ElectronService {

    public async invokeIpc<T>(channel: string, ...args: Array<unknown>): Promise<IpcResult<T>> {
        if (!window.electronBridge) {
            return {
                error: true,
                data: null,
                message: `Error invoking remote method '${channel}': No electronBridge detected`,
            };
        }
        return window.electronBridge.invokeIpc<T>(channel, ...args).catch(err => ({
            error: true,
            data: null,
            message: err instanceof Error ? err.message : `Error invoking remote method '${channel}'`,
        }));
    }

}
