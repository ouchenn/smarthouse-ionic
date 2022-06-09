import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Room } from '../models/room';
import { FloorsroomsService } from '../services/floorsrooms.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  constructor(
    private appComponent: AppComponent,
    private floorService: FloorsroomsService
  ) {}

  ngOnInit(): void {
    this.getALL();
  }
  addButton = true;
  modalForm: Room = {};
  roomsList: Room[] = [];
  editeIndex: number = 0;
  floorsList: Room[] = [];

  getALL() {
    this.floorService.findromms().subscribe((rooms) => {
      this.roomsList = rooms;
    });
  }

  add() {
    this.floorService.addromms(this.modalForm).subscribe((added) => {
      // spread operator
      this.roomsList = [added, ...this.roomsList];
    });
  }

  delete(id: number | undefined) {
    this.floorService.deleteromms(id).subscribe(() => {
      this.roomsList = this.roomsList.filter((ele) => ele.id != id);
    });
  }

  edite(floor: any, i: number) {
    this.modalForm = floor;
    this.addButton = false;
    this.editeIndex = i;
  }
  update() {
    this.floorService.updateromms(this.modalForm).subscribe((Updated) => {
      this.addButton = true;
      this.roomsList[this.editeIndex] = Updated;
      this.modalForm = {};
    });
  }
  getchoises() {
    this.floorService.findfloors().subscribe((floors) => {
      this.floorsList = floors;
    });
  }
  open(content: any) {
    this.getchoises();
    this.appComponent.open(content);
  }
}
