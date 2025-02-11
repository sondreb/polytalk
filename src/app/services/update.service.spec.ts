import { test, expect } from '@playwright/test';
import { UpdateService } from './update.service';
import { SwUpdate } from '@angular/service-worker';

test.describe('UpdateService', () => {
  let service: UpdateService;
  let swUpdate: SwUpdate;

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      TestBed.configureTestingModule({
        providers: [
          UpdateService,
          { provide: SwUpdate, useValue: jasmine.createSpyObj('SwUpdate', ['checkForUpdate', 'activateUpdate', 'versionUpdates']) }
        ],
      }).compileComponents();
    });
    service = TestBed.inject(UpdateService);
    swUpdate = TestBed.inject(SwUpdate);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  // test('should check for updates on initialization', () => {
  //   expect(swUpdate.checkForUpdate).toHaveBeenCalled();
  // });

  // test('should set updateAvailable to true when a new version is available', () => {
  //   const versionUpdatesSpy = swUpdate.versionUpdates as jasmine.SpyObj<any>;
  //   versionUpdatesSpy.subscribe.and.callFake((callback: any) => {
  //     callback({ type: 'VERSION_READY' });
  //   });

  //   service = TestBed.inject(UpdateService);
  //   expect(service.updateAvailable()).toBeTrue();
  // });

  // test('should activate update and reload the page when updateNow is called', async () => {
  //   const activateUpdateSpy = swUpdate.activateUpdate as jasmine.Spy;
  //   activateUpdateSpy.and.returnValue(Promise.resolve());

  //   spyOn(window.location, 'reload');

  //   await service.updateNow();
  //   expect(activateUpdateSpy).toHaveBeenCalled();
  //   expect(window.location.reload).toHaveBeenCalled();
  // });

  // test('should clear the check interval on destroy', () => {
  //   spyOn(window, 'clearInterval');
  //   service.ngOnDestroy();
  //   expect(window.clearInterval).toHaveBeenCalled();
  // });
});
