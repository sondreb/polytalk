import { Injectable, signal } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  updateAvailable = signal(false);

  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          console.log('New version available');
          this.updateAvailable.set(true);
        }
      });
    }
  }

  updateNow() {
    this.swUpdate.activateUpdate().then(() => {
      document.location.reload();
    });
  }
}
