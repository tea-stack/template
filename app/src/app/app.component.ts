import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, WritableSignal, signal } from '@angular/core';
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
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly electron: ElectronService,
    ) {
        void this.electron.invokeIpc('getElectronVersion').then(res => {
            if (res.ok && res.data.startsWith('22')) {
                // remove drag bar for win7 regarding of window titlebar
                this.document.querySelector('div.dragbar')?.remove();
            }
        });

        void this.electron.invokeIpc('getVersion').then((ipcRes: IpcResult<string>) => {
            if (ipcRes.ok) {
                setTimeout(() => {
                    this.appVersion.set(`${ipcRes.data}🎉`);
                }, 1800);
            } else {
                console.error(ipcRes.message);
            }
        });
    }

    public async toggleDevTools(): Promise<void> {
        await this.electron.invokeIpc('toggleDevTools');
    }

}
