import { Injectable } from '@angular/core';
import { AngularFireList,AngularFireDatabase } from '@angular/fire/compat/database';
import { IExpense } from '../../models/common.models';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private dbPath = '/test';
  expensesRef: AngularFireList<any>;  // $con = mysqli_connet()
  constructor(private db: AngularFireDatabase) {
    this.expensesRef = db.list(this.dbPath);
   }
   getAllExpenses(){
    return this.expensesRef;
   }
   getExpense(key: string){
    return this.db.object(`${this.dbPath}/${key}`);
   }
   addExpense(expense: IExpense){
    this.expensesRef.push(expense);
   }
   updateExpense(key: string ,expense: IExpense){
    this.expensesRef.update(key,expense);
   } 
    deleteExpense(key: string){
    return this.expensesRef.remove(key);
   }
}
