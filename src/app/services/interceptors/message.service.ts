import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AppMessageService {
  constructor(private messageService: MessageService) {}

  success(summary: string, detail: string) {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  error(summary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary, detail });
  }
}
