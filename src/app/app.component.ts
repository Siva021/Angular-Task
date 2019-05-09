import { Component, HostListener, ViewChild, Renderer2 } from '@angular/core';
import { ColumnModal } from './column-modal';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Datatable';
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
  hideColumn:boolean;

  @ViewChild('input') myInput;

  columns;

  commonID;

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
      pagingType: 'full_numbers',
      paging:true,
      order:[1]
    };
    this.generateForm = false;
    this.showDatatable = false;
    this.hideColumn = true;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(this.generateForm) {
      if(this.commonID != undefined) {
        //console.log("CommonID",this.commonID);
        if (event.keyCode === 13) {
          //console.log("Key Enter Pressed");
        }
        if (event.keyCode === 37) {
          this.onLeft();      
        }
        if (event.keyCode === 38) {
          // this.onUp();
        }
        if (event.keyCode === 39) {
          this.onRight();
        }
        if (event.keyCode === 40) {
          // this.onDown();
        }if (event.keyCode === 13) {
          this.onEnter();
        }
      }
    } else if(!this.generateForm) {
      if (event.keyCode === 13) {
        this.addColumn();
      }
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
    //console.log("Table Entries",JSON.stringify(this.tableEntries));
    this.columnName = "";
    this.multiselectValues = "";
  }

  columnChange(value){
    //console.log(value);
    this.columnType = value;
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
      //console.log("Data values",JSON.stringify(this.dataValues));
      this.generateForm = true;
      this.hideColumn = false;
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
    //console.log("Data values",JSON.stringify(this.dataValues));
  }

  onRight() {
    //console.log("Key Right Pressed");
    //console.log("NextSibling",this.renderer2.selectRootElement("#"+this.commonID).parentNode.nextElementSibling.children[0]);
    if(this.renderer2.selectRootElement("#"+this.commonID).parentNode.nextElementSibling.children[0] != null){
      this.renderer2.selectRootElement("#"+this.commonID).parentNode.nextElementSibling.children[0].focus();
    }
    else {
      // this.renderer2.selectRootElement("#"+this.commonID).parentNode.children[0].focus();
    }
  }

  onLeft() {
    //console.log("NextSibling",this.renderer2.selectRootElement("#"+this.commonID).parentNode.previousElementSibling.children[0]);
    //console.log("Key Left Pressed");
    if(this.renderer2.selectRootElement("#"+this.commonID).parentNode.previousElementSibling.children[0] != null){
      this.renderer2.selectRootElement("#"+this.commonID).parentNode.previousElementSibling.children[0].focus();
    }
    else {
      // this.renderer2.selectRootElement("#"+this.commonID).parentNode.children[0].focus();
    }
  }

  onEnter() {
    //console.log("Key Enter Pressed");
    var idForUp = this.commonID.split('_');
    let y = parseInt(idForUp[1]);
    let x = idForUp[2];
    let obj = Object.keys(this.dataValues[y]);
    //console.log("obj",JSON.stringify(obj));
    let arrVal = obj.filter(data=>this.dataValues[y][data] != "");
    //console.log(arrVal,arrVal.length);
    if(arrVal.length < obj.length) {
      window.alert("Please fill all the field and then press enter");
      return;
    }
    if(y == this.dataValues.length+1) {
      return;
    } else {
      y=y+1;
      this.commonID = 'index_'+y+'_'+x;
      //console.log("CommonID after Down",this.commonID);
      if(this.renderer2.selectRootElement("#"+this.commonID) != null){
        this.renderer2.selectRootElement("#"+this.commonID).focus();
      }
      else {
        this.renderer2.selectRootElement("#"+this.commonID).parentNode.children[0].focus();
      }
    }
  }

  createTable() {
    let obj = Object.keys(this.dataValues[0]);
    //console.log("obj",JSON.stringify(obj));
    var finalOpt;
    obj.map(val=>{
      finalOpt = this.dataValues.filter(data=>data[val] != "")
    })
    //console.log("finalOpt",finalOpt.length);
    if(finalOpt.length >= 2){
      this.showDatatable = true;
      this.generateForm = false;
      //console.log("DataValue in datatable",this.dataValues);
    } else {
      window.alert("Atlest two fields should be filled to create Datatable");
    }
  }

  onFocus(id) {
    //console.log("ID",id);
    this.commonID = id;
  }

  getUserOption(opt) {
    //console.log(opt);
  }

}
