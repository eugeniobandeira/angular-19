/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InclusionFormComponent } from './inclusion-form.component';

describe('InclusionFormComponent', () => {
  let component: InclusionFormComponent;
  let fixture: ComponentFixture<InclusionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InclusionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InclusionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
