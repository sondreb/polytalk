import { TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { UpdateService } from './update.service';

describe('UpdateService', () => {
  let service: UpdateService;
  let swUpdate: SwUpdate;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpdateService,
        { provide: SwUpdate, useValue: jasmine.createSpyObj('SwUpdate', ['checkForUpdate', 'activateUpdate', 'versionUpdates']) }
      ],
    });
    service = TestBed.inject(UpdateService);
    swUpdate = TestBed.inject(SwUpdate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should check for updates on initialization', () => {
  //   expect(swUpdate.checkForUpdate).toHaveBeenCalled();
  // });

  // it('should set updateAvailable to true when a new version is available', () => {
  //   const versionUpdatesSpy = swUpdate.versionUpdates as jasmine.SpyObj<any>;
  //   versionUpdatesSpy.subscribe.and.callFake((callback: any) => {
  //     callback({ type: 'VERSION_READY' });
  //   });

  //   service = TestBed.inject(UpdateService);
  //   expect(service.updateAvailable()).toBeTrue();
  // });

  // it('should activate update and reload the page when updateNow is called', async () => {
  //   const activateUpdateSpy = swUpdate.activateUpdate as jasmine.Spy;
  //   activateUpdateSpy.and.returnValue(Promise.resolve());

  //   spyOn(window.location, 'reload');

  //   await service.updateNow();
  //   expect(activateUpdateSpy).toHaveBeenCalled();
  //   expect(window.location.reload).toHaveBeenCalled();
  // });

  // it('should clear the check interval on destroy', () => {
  //   spyOn(window, 'clearInterval');
  //   service.ngOnDestroy();
  //   expect(window.clearInterval).toHaveBeenCalled();
  // });
});
