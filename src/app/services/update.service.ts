import { Injectable, signal, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class UpdateService implements OnDestroy {
  updateAvailable = signal(false);
  private checkInterval: any;

  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          console.log('New version available');
          this.updateAvailable.set(true);
        }
      });

      // Check for updates every 30 minutes
      this.checkInterval = setInterval(() => {
        this.checkForUpdate();
      }, 30 * 60 * 1000);

      // Initial check
      this.checkForUpdate();
    }
  }

  private checkForUpdate() {
    this.swUpdate.checkForUpdate();
  }

  updateNow() {
    this.swUpdate.activateUpdate().then(() => {
      document.location.reload();
    });
  }

  ngOnDestroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
}
