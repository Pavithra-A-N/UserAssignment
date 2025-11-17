import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/users.service';
import { AppMessageService } from '../../../services/interceptors/message.service';
import { User } from '../../../services/models/user.model';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ColumnDef, GenericListComponent } from "../../../components/list/generic-list.component";
import { SelectModule } from 'primeng/select';
import { GenericDialogComponent } from '../../../components/dialog/generic-dialog.component';
import { InputTextModule } from 'primeng/inputtext';
import { GenericFormComponent } from '../../../components/form/generic-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { USER_FORM_CONFIG, USER_FORM_GROUP_DEF } from '../config/user-ui.config';


@Component({
  selector: 'app-user-dashboard',
  standalone:true,
  imports: [ReactiveFormsModule,
    SelectModule,
    CommonModule,
    ToastModule, 
    ButtonModule, 
    InputTextModule,
    ConfirmDialogModule,
    GenericListComponent,
    GenericFormComponent,
    GenericDialogComponent],
    providers: [ConfirmationService],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit{
  users: User[] = [];
  columns: ColumnDef<User>[] = [];
  @ViewChild('actionTemplate', { static: true }) actionTemplate!: TemplateRef<any>;
  selectedUser: User | null = null;
  dialogVisible = false;
  
  userForm!: FormGroup;
  dialogHeader = '';

  formConfig = USER_FORM_CONFIG;
  editData!: User;

  @ViewChild('genericForm') genericFormComponent!: GenericFormComponent;

  constructor(private userService: UserService, 
    private msg: AppMessageService,  
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,) {}

  ngOnInit() {

     this.columns = [
      { header: 'Name', field: 'name', sortable: true },
      { header: 'Email', field: 'email', sortable: true },
      { header: 'Role', field: 'role', sortable: true },
      { header: 'Status', field: 'status', sortable: true },
      {
        header: 'Actions', width: '120px', templateRef: this.actionTemplate
      }
    ];

    this.userForm = this.fb.group(USER_FORM_GROUP_DEF);
    this.loadUsers();
  }
  

  loadUsers() {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }


  saveUser(user: any) {
    const isEdit = !!user.id; 
    if (isEdit) {
      if(JSON.stringify(this.editData) === JSON.stringify(user)){
        this.msg.error('Error', 'No changes detected.'); 
        this.dialogVisible = false;
        return; // trying to return to avoid the rerender of components 
      }
        this.userService.updateUser(user).subscribe(() => {
        this.msg.success('Success', 'User updated');
        this.dialogVisible = false;
        this.loadUsers();
      });
    } else {
        this.userService.addUser(user).subscribe(() => {
        this.msg.success('Success', 'User added');
        this.dialogVisible = false;
        this.loadUsers();
      });
    }
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
    message: `Are you sure you want to delete "${user.name}"?`,
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        this.userService.deleteUser(user.id).subscribe(() => {
        this.msg.success('Deleted', 'User Deleted');
        this.loadUsers();
      });
    }
  });
  }

  // All Actions of User is handled here
  handleAction(action: string, rowData: User | null): void {
  if (action === 'add') {
    this.dialogHeader = 'Add User';
    this.selectedUser = null;
    this.userForm.reset();
    this.dialogVisible = true;
  } else if (action === 'edit' && rowData) {
    this.editData=rowData;
    this.dialogHeader = 'Edit User';
    this.selectedUser = { ...rowData };
    this.userForm.patchValue(rowData);
    this.dialogVisible = true;
  } else if (action === 'delete' && rowData) {
    this.deleteUser(rowData);
  }
}
handleDialogSave(): void {
    // Call the public method on the nested form component
    this.genericFormComponent.triggerFormSubmission();

    // The rest of the workflow is:
    // 1. If form is valid, GenericFormComponent emits (formSubmit)
    // 2. The parent's saveUser($event) method catches the emitted data
    // 3. saveUser() closes the dialog upon successful API response
  }

}


