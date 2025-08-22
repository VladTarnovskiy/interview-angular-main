import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTemplateComponent } from './components/card-template/card-template.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [CardTemplateComponent, ModalComponent],
  imports: [CommonModule],
  exports: [CardTemplateComponent, ModalComponent],
})
export class SharedModule {}
