import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateCase } from './modal-create-case.component';

describe('ModalCreateCase', () => {
  let component: ModalCreateCase;
  let fixture: ComponentFixture<ModalCreateCase>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateCase ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateCase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
