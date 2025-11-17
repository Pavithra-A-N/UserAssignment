import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDashboardComponent } from "./features/users/user-dashboard/user-dashboard.component";
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  protected readonly title = signal('user-management');
}
