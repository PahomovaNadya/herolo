import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppComponent } from './../app.component';
import { empty } from '../../../node_modules/rxjs/Observer';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./book.component.css']
})
export class EditComponent implements OnInit {
  @Input() itemSelect;
  act: string = "";
  myFirstReactiveForm: FormGroup;
  
  constructor(private fb: FormBuilder, private appPage: AppComponent) { }
  static date(c: FormControl) {
    const dateRegEx = new RegExp('([0-9]{2})+\/+([0-9]{2})+\/+([0-9]{4})');
    return dateRegEx.test(c.value) ? null : {date: true}
  };

  ngOnInit() {
    this.initForm();
  }
  
  onSubmit() {
    const controls = this.myFirstReactiveForm.controls;

    if (this.myFirstReactiveForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      return;
    }
    this.appPage.addEditResult(this.myFirstReactiveForm.value, this.act);
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.myFirstReactiveForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
  validDate(): boolean  {
    var arrDt = (document.getElementById("mydate").value).split("/");
    const controlDt = this.myFirstReactiveForm.controls["mydate"];
    var flg = controlDt.invalid && controlDt.touched;
    if( document.getElementById("mydate").value != "" ){
      flg = true;
      if(arrDt[0].length==2 && arrDt[1].length==2 && arrDt[2].length==4 ) {
        if( (parseInt(arrDt[2])%4==0 && parseInt(arrDt[1])==2 && parseInt(arrDt[0])<30) || (parseInt(arrDt[2])%4!=0 && parseInt(arrDt[1])==2 && parseInt(arrDt[0])<29) ){
          flg = false;
        } else {
          if(parseInt(arrDt[1]) < 13 && parseInt(arrDt[1]) < 31 && parseInt(arrDt[1])!=2) {
            flg = false;
          }
        }
      }
    }
    return flg;
  }
  randomNumber(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }
  randomID() {
    let arrCapLit = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let arrLit = "abcdefghijklmnopqrstuvwxyz";
    let strID = "";
    for( var i=0; i<12; i++) {
      switch(i){
        case 0:
          strID +=this.randomNumber(0, 9);
          break;
        case 1:
          strID +=arrLit[this.randomNumber(0, 25)];
          break;
        case 2:
          strID +=arrCapLit[this.randomNumber(0, 25)];
          break;
        case 3:
          strID +=arrLit[this.randomNumber(0, 25)];
          break;
        case 4:
          strID +=arrCapLit[this.randomNumber(0, 25)];
          break;
        case 5:
          strID +=arrLit[this.randomNumber(0, 25)];
          break;
        case 6:
          strID +=arrCapLit[this.randomNumber(0, 25)];
          break;
        case 7:
          strID +=arrLit[this.randomNumber(0, 25)];
          break;
        case 8:
          strID +="_";
          break;
        case 9:
        case 10:
        case 11:
          strID +=arrCapLit[this.randomNumber(0, 25)];
          break;
      }
    }
    return strID;
  } 
  private initForm() {
    switch(this.itemSelect.act) {
      case "add":
        this.act = "add";
        this.myFirstReactiveForm = this.fb.group({
          id: [this.randomID()],
          title: ['', Validators.required],
          author: ['', Validators.required],
          mydate: ['', [
              Validators.required, 
              Validators.pattern('([0-9]{2})+\/+([0-9]{2})+\/+([0-9]{4})')
            ]
          ],
          description: ['', Validators.required],
          imagesmallurl: ['http://www.naddim.com/nadya/portfolio/images/notFound.jpg'],
          imagebigurl: ['http://www.naddim.com/nadya/portfolio/images/notFound.jpg']
          });
        break;
      case "edit":
        this.act = "edit";
        this.myFirstReactiveForm = this.fb.group({
          id: [this.itemSelect.id],
          title: [this.itemSelect.title, Validators.required],
          author: [this.itemSelect.author, Validators.required],
          mydate: [this.itemSelect.mydate, [
              Validators.required, 
              Validators.pattern('([0-9]{2})+\/+([0-9]{2})+\/+([0-9]{4})')
            ]
          ],
          description: [this.itemSelect.description, Validators.required],
          imagesmallurl: [this.itemSelect.imagesmallurl],
          imagebigurl: [this.itemSelect.imagebigurl]
        });
        break;
    }
  }
  cancelBook() {
    window.location.href="#close";
    return false;
  }
}