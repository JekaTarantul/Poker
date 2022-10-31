import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../../../auth/services/auth.service";
import {wrap} from "../../../utils/load-state";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {

  userMenu: MenuItem[] = [
    {
      label: 'Settings',
      icon: 'pi pi-wrench',
      command: () => {

      }
    },
    {
      label: 'Add Balance',
      icon: 'pi pi-plus',
      command: () => {
      }
    },
    {
      label: 'Log out',
      icon: 'pi pi-sign-out',
      command: () => {
      }
    }
  ]
  private userService = inject(AuthService);
  user$ = wrap(this.userService.getUser());
}
