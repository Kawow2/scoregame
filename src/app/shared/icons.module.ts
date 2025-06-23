import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroAcademicCap,
  heroChevronDown,
  heroChevronUp,
} from '@ng-icons/heroicons/outline';
import { NgIconsModule } from '@ng-icons/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgIcon, NgIconsModule.withIcons({})],

  providers: [
    provideIcons({ heroChevronDown, heroChevronUp, heroAcademicCap }),
  ],
})
export class IconsModule {}
