import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(public updates: SwUpdate) {
    if (updates.isEnabled) {
      interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }
  }

  public checkForUpdates() {
    this.updates.available.subscribe(event => this.promptUser());
  }

  private promptUser() {
    console.log('updating to new version');
    this.updates.activateUpdate().then((e) => {
      console.log(e,'update hit');
      document.location.reload()
    }); 
  }
}
