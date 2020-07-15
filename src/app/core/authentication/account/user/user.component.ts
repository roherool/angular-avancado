import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormControlName,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { CustomValidators } from 'ngx-custom-validators';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/core/services/account.service';
import {
  ValidationMessages,
  GenericValidator,
  DisplayMessage,
} from 'src/app/shared/directives/generic-form-validation';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  errors: any[] = [];
  userForm: FormGroup;
  user: User;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  unsavedChanges: boolean;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem',
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    let password = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
    ]);
    let confirmPassword = new FormControl('', [
      Validators.required,
      CustomValidators.equalTo(password),
    ]);

    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: password,
      confirmPassword: confirmPassword,
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<
      any
    >[] = this.formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(
        this.userForm
      );
      this.unsavedChanges = true;
    });
  }

  addAccount() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.user = Object.assign({}, this.user, this.userForm.value);

      this.accountService.createUser(this.user).subscribe(
        (sucesso) => {
          this.successfully(sucesso);
        },
        (falha) => {
          this.failed(falha);
        }
      );

      this.unsavedChanges = false;
    }
  }

  successfully(response: any) {
    this.userForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveLocalUserData(response);

    let toast = this.toastr.success(
      'Registro realizado com Sucesso!',
      'Bem vindo!!!'
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  failed(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
