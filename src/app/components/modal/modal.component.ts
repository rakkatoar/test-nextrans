import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Output() getTodos = new EventEmitter<string>();
  public formData: FormGroup;
  public showFormModal:boolean = false;
  public showSuccessModal:boolean = false;
  public todos: any= [];
  headers = new HttpHeaders()
  .set('Content-Type', 'application/json; charset=utf-8')
  .set('Accept', 'application/json');
  constructor(
    public todoService: TodoService,
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.formData = this.fb.group({
      title: ['', Validators.required],
    });
  }
  onSubmitForm() {
    if (this.formData.valid) {
      const body = { 
        title:this.formData.value.title,
        completed:false
      };
      this.httpClient
      .post("https://jsonplaceholder.typicode.com/todos", body, {
        headers: this.headers,
      }).subscribe({
        next: (res: any) => {
          this.todoService.addTodos(res);
          this.todos.push(res)
          this.formData.reset();
          this.showFormModal = false;
          this.showSuccessModal = true;
        },
        error: (err: any) => {
          console.log(err)
        },
      });

      this.changeModal('form');
    }
  }
  changeModal(type:string){
    if(type === "form"){
      this.showFormModal = !this.showFormModal;
    } else if (type === "success"){
      this.showSuccessModal = !this.showSuccessModal;
      if(!this.showSuccessModal){
        this.getTodos.emit();
      }
    }
  }
}
