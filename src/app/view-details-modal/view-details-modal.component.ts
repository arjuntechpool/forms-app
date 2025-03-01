import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-details-modal',
  standalone: true,
  imports: [MatDialogModule,DatePipe],
  templateUrl: './view-details-modal.component.html',
  styleUrl: './view-details-modal.component.css'
})
export class ViewDetailsModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
