import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-view-details-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './view-details-modal.component.html',
  styleUrl: './view-details-modal.component.css',
})
export class ViewDetailsModalComponent {
  remarks: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewDetailsModalComponent> // Inject MatDialogRef
  ) {}

  // Method to handle the Close button
  onClose() {
    this.dialogRef.close(0); // Return 0 for Close
  }

  // Method to handle the Reject button
  onReject() {
    this.dialogRef.close({ action: 2, remarks: this.remarks }); // Return 2 for Reject with remarks
  }

  // Method to handle the Approve button
  onApprove() {
    this.dialogRef.close({ action: 1, remarks: this.remarks }); // Return 1 for Approve with remarks
  }
}
