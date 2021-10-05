import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseFullscreenModule } from '@fuse/components/fullscreen/fullscreen.module';
import { LanguagesModule } from '../../../common/languages/languages.module';
import { MessagesModule } from '../../../common/messages/messages.module';
import { NotificationsModule } from '../../../common/notifications/notifications.module';
import { QuickChatModule } from '../../../common/quick-chat/quick-chat.module';
import { SearchModule } from '../../../common/search/search.module';
import { ShortcutsModule } from '../../../common/shortcuts/shortcuts.module';
import { UserModule } from '../../../common/user/user.module';
import { ClassyLayoutComponent } from './classy.component';

@NgModule({
  declarations: [ClassyLayoutComponent],
  imports: [
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    FuseFullscreenModule,
    FuseNavigationModule,
    LanguagesModule,
    MessagesModule,
    NotificationsModule,
    QuickChatModule,
    SearchModule,
    ShortcutsModule,
    UserModule,
  ],
  exports: [ClassyLayoutComponent],
})
export class ClassyLayoutModule {}
