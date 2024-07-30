import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import {MatCardModule } from '@angular/material/card';
import {MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';




let matModuleArr = [ MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatProgressSpinnerModule
]
@NgModule({
  declarations: [],
  imports: [CommonModule,...matModuleArr ],
  exports :[... matModuleArr ]
})
export class MaterialModule { }

