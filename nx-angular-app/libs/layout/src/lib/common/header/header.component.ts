import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  OnDestroy,
  Input,
} from '@angular/core';
import { AuthenticationService } from '@smec-monorepo/shared/data-access';

import { Subject } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  ngUnsubscribe = new Subject<void>();
  className = '';

  logo = 'assets/logos/logo_sige.svg';

  @Input() title: string | null = '';

  constructor(
    private authService: AuthenticationService,
  ) {}

  logout() {
    this.authService.logout();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
