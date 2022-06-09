import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Device } from '../models/device';
import { Room } from '../models/room';
import { DeviceService } from '../services/device.service';
import { FloorsroomsService } from '../services/floorsrooms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private deviceService: DeviceService,
    private appComponent: AppComponent,

    private rf: FloorsroomsService
  ) {}
  devicesList: Device[] = [];
  rommsList: Room[] = [];
  floorsList: Room[] = [];
  deviceForm: Device = {};
  addButton = true;
  editeIndex: number = 0;
  ngOnInit(): void {
    this.getDevices();
  }

  getDevices() {
    this.deviceService.findAll().subscribe((devices) => {
      this.devicesList = devices;
    });
  }

  toggleStatus(device: Device) {
    this.deviceService.changeStatus(device).subscribe((devicer) => {
      device.status = devicer.status;
    });
  }

  add() {
    this.deviceService.add(this.deviceForm).subscribe((deviceAded) => {
      // spread operator
      this.devicesList = [deviceAded, ...this.devicesList];
    });
  }

  deleteDevices(id: number | undefined) {
    this.deviceService.delete(id).subscribe(() => {
      this.devicesList = this.devicesList.filter((dev) => dev.id != id);
    });
  }

  editDevices(device: any, i: number) {
    this.deviceForm = device;
    this.addButton = false;
    this.editeIndex = i;
  }
  updateDevice() {
    this.deviceService.update(this.deviceForm).subscribe((deviceUpdated) => {
      this.addButton = true;
      this.devicesList[this.editeIndex] = deviceUpdated;
      this.deviceForm = {};
    });
  }

  open(content: any) {
    this.getchoises();
    this.appComponent.open(content);
  }
  getchoises() {
    this.rf.findfloors().subscribe((floors) => {
      this.floorsList = floors;
    });
    this.rf.findromms().subscribe((rooms) => {
      this.rommsList = rooms;
    });
  }
  getinverse(value: any) {
    switch (value) {
      case 'ON':
        return 'OFF';
      default:
        return 'ON';
    }
  }
}
