import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  UsersModule } from "./users/users.module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {  UsersService  } from "./users/users.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UsersModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
