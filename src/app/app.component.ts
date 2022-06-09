import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TokenServiceService } from './services/token-service.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'home', url: '/home', icon: 'home' },
    { title: 'floor', url: '/floor', icon: 'albums' },
    { title: 'room', url: '/room', icon: 'apps' },
  ];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenServiceService
  ) {}
  closeResult: string | undefined;
  currentuser: any = null;
  ngOnInit(): void {
    this.userService.authStatus.subscribe((res) => {
      this.currentuser = localStorage.getItem('email');
    });
  }
  ////modaL
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  logout() {
    this.tokenService.remove();
    this.tokenService.changeStatus(false);
    this.router.navigateByUrl('/login');
  }
}
