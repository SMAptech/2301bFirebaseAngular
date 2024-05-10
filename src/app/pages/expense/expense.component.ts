import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExpenseService } from '../../core/services/expense.service';
import { IExpense } from '../../models/common.models';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent implements OnInit{
  expenses: IExpense[] = [];
  expenseId = '';
  totalExpenses = 0;
  constructor(private expenseService: ExpenseService, private router:Router,private activatedRoute: ActivatedRoute){

  }
  ngOnInit(): void {
    this.getAllExpensesOnit();

  }
  getAllExpensesOnit(){
    this.expenseService.getAllExpenses().snapshotChanges().subscribe({
      next: (data) => {
        console.log(data[0].payload.toJSON());
        this.expenses = [];
        data.forEach((item)=>{
          let expense = item.payload.toJSON() as IExpense;
          this.totalExpenses += parseInt(expense.price);
          this.expenses.push({
            key: item.key || '',
            title: expense.title,
            description: expense.description,
            price: expense.price,
          });
        });
      }
    })
    console.log(this.expenses);
  }
 
  editExpense(key:string){
    this.router.navigate(['/expense-form/'+key])
  }
}
