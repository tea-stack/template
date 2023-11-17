import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { ElectronService } from './shared/services';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'tea-app',
    standalone: true,
    template: '<h1>Greate! TEA Stack works</h1><p>with version {{ appVersion() }}</p><p (click)="toggleDevTools();" style="cursor: pointer; text-decoration: underline;">Toggle DevTools</p>',
})
export class AppComponent {

    public appVersion: WritableSignal<string> = signal('🧐🧐🧐');

    public constructor(
        private readonly electron: ElectronService,
    ) {
        this.electron.invokeIpc('getVersion').then((ipcRes: IpcResult<string>) => {
            if (ipcRes.error) {
                console.error(ipcRes.message);
            } else {
                setTimeout(() => {
                    this.appVersion.set(`${ipcRes.data}🎉`);
                }, 1800);
            }
        }).catch(() => { });
    }

    public async toggleDevTools(): Promise<void> {
        await this.electron.invokeIpc('toggleDevTools');
    }

}
