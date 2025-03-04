import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../core/services/expense.service';
// import { Router } from 'express';
import { ActivatedRoute,Router } from '@angular/router';
import { IExpense } from '../../models/common.models';
@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent implements OnInit{
  expenseForm!: FormGroup;
  expenseId = '';
  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private router: Router,private activatedRoute: ActivatedRoute){
    this.expenseForm = this.fb.group({
      price :new FormControl('', [Validators.required]),
      title :new FormControl('', [Validators.required]),
      description :new FormControl(''),


    });
  }
  ngOnInit(): void {
        this.activatedRoute.params.subscribe({
      next: (params)=>{
      this.expenseId = params['id'];
        this.getExpense(this.expenseId);
      }
    });
  }
  onSubmit(){
    if(this.expenseForm.valid){
      if(this.expenseId != ''){
        this.expenseService.updateExpense(this.expenseId,this.expenseForm.value);
      }else{
        this.expenseService.addExpense(this.expenseForm.value);
      }
      this.router.navigate(['/']);
      console.log(this.expenseForm.value);
    }else{
      this.expenseForm.markAllAsTouched();
    }
  }
   getExpense(key: string){
    this.expenseService.getExpense(key).snapshotChanges().subscribe({
      next: (data)=>{
        let expense = data.payload.toJSON() as IExpense;
        this.expenseForm.setValue(expense);
      }
    })
  }

}
