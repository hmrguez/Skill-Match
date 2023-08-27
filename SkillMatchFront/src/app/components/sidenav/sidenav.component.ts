import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {navbarData} from "./nav-data";


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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed})
    }
  }

  collapsed = false;
  navData = navbarData
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
