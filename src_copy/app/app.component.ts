import { Component, HostListener, ViewChild, Renderer2 } from '@angular/core';
import { ColumnModal } from './column-modal';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simpleTask';
  columnName="";
  columnType="";
  multiselectValues="";
  options = [];

  dataValues = [];
  userData;
  rows:any;
  dtOptions: DataTables.Settings = {};

  generateForm:boolean;
  showDatatable:boolean;

  @ViewChild('input') myInput;

  columns;

  userForm:FormGroup;
  dropDownList = 
    [{ name: 'Date',value: 'date' },
    { name: 'Number',value: 'number' },
    { name: 'Multiselect',value:'multiselect'}];

  tableEntries:ColumnModal[]=[];

  constructor(private renderer2:Renderer2){

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    this.generateForm = false;
    this.showDatatable = false;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(this.generateForm) {
      if (event.keyCode === 39) {
        console.log("Key Right Pressed");
        if(this.renderer2.selectRootElement('input').parentNode.nextElementSibling.children[0] != null){
          this.renderer2.selectRootElement('input').parentNode.nextElementSibling.children[0].focus();
        }
        else {
          this.renderer2.selectRootElement('input').parentNode.children[0].focus();
        }
      }
    //   if (event.keyCode === 37) {
    //     this.onLeft();      
    //   }
    //   if (event.keyCode === 13) {
    //     console.log("Key Enter Pressed");
    //   }
    // } else if(!this.generateForm) {
    //   if (event.keyCode === 13) {
    //     console.log("Key Enter Pressed");
    //     this.addColumn();
    //   }
    }
  }
  
  addColumn() {
    this.options = [];
    if(this.columnType == 'multiselect') {
      let optionArr = this.multiselectValues.split(',');
      optionArr.map((opt) => {
        this.options.push(opt)
      })
    }
    this.tableEntries.push({name:this.columnName,type:this.columnType,options:this.options});
    console.log("Table Entries",JSON.stringify(this.tableEntries));
    this.columnName = "";
    this.multiselectValues = "";
  }

  columnChange(value){
    console.log(value);
    this.columnType = value;
  }

  getUserOption(opts) {
    console.log(JSON.stringify(opts));
  }

  createForm() {
    // this.userData = JSON.stringify(this.userForm.value);
    if(this.tableEntries.length > 0) {
      for(let i=0;i<20;i++){
        this.rows = {};
        for(let i=0;i<this.tableEntries.length;i++) {
          this.rows[this.tableEntries[i]['name'].replace(' ','_')] = ""
        }
        this.dataValues.push(this.rows);
      }
      console.log("Data values",JSON.stringify(this.dataValues));
      this.generateForm = true;
    }
  }

  addNewRow() {
    if(this.tableEntries.length > 0) {
      this.rows = {};
      for(let i=0;i<this.tableEntries.length;i++) {
        this.rows[this.tableEntries[i]['name'].replace(' ','_')] = ""
      }
      this.dataValues.unshift(this.rows);
    }
    console.log("Data values",JSON.stringify(this.dataValues));
  }

  onRight() {
    console.log("Key Right Pressed");
    this.renderer2.selectRootElement('input').nextElementSibling.focus();
  }

  onLeft() {
    console.log("Key Left Pressed");
    this.renderer2.selectRootElement('select').previousElementSibling.focus();
  }

  onSubmit() {
  }

  createTable() {
    this.showDatatable = true;
    console.log("DataValue in datatable",this.dataValues);
  }

  setId(y,x){
    console.log("y",y);
    console.log("x",x);
    return "input_"+y+"_"+x;
  }

}
