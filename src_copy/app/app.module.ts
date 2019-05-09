import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { TableFormComponent } from './table-form/table-form.component';
import { TableViewComponent } from './table-view/table-view.component';
import { ArrowkeyindexDirective } from './arrowkeyindex.directive';

@NgModule({
  declarations: [
    AppComponent,
    TableFormComponent,
    TableViewComponent,
    ArrowkeyindexDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
