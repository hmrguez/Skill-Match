import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";


interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter<SideNavToggle>()

  navData: any
  collapsed = false;
  screenWidth: number = 0;

  constructor(public authService: AuthService){
    this.navData = [
      {
        routeLink: "/dashboard",
        icon: "pi pi-folder",
        label: "Dashboard",
      },
      {
        routeLink: `/profile/${this.authService.getUsername()}`,
        icon: "pi pi-prime",
        label: "Profile",
      },
      {
        routeLink: "/jobs",
        icon: "pi pi-briefcase",
        label: "Jobs",
      },
      {
        routeLink: "/daily-challenge",
        icon: "pi pi-controller",
        label: "Daily Challenge",
      },
      {
        routeLink: "/login",
        icon: "pi pi-user",
        label: "Login",
      },
    ];
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed})
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed})
  }

  closeNavbar() {
    this.collapsed = false;
    this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed})
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
}
