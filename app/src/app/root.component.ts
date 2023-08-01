import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ElectronService } from './shared/services';
import { BehaviorSubject } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
    ],
    selector: 'tea-root',
    standalone: true,
    template: '<h1>Greate! TEA Stack works</h1><p>with version {{ electronVersion$ | async }}</p>',
})
export class RootComponent {

    public electronVersion$: BehaviorSubject<string> = new BehaviorSubject<string>('unknown');

    public constructor(
        private readonly electron: ElectronService,
    ) {
        this.electron.invokeIpc<string>('getVersion').then((ipcRes: IpcResult<string>) => {
            if (ipcRes.error) {
                console.error(ipcRes.message);
            } else {
                this.electronVersion$.next(ipcRes.data);
            }
        }).catch(() => { });
    }

}
