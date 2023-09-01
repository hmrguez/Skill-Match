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

  navbarData = [
    {
      routeLink: "/dashboard",
      icon: "pi pi-folder",
      label: "Dashboard",
    },
    {
      routeLink: "/profile",
      icon: "pi pi-prime",
      label: "Profile",
    },
    {
      routeLink: "/skills",
      icon: "pi pi-star",
      label: "Skills",
    },
    {
      routeLink: "/login",
      icon: "pi pi-user",
      label: "Login",
    },
  ];


  constructor(public authService: AuthService){}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed})
    }
  }

  collapsed = false;
  navData = this.navbarData
  screenWidth: number = 0;

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
