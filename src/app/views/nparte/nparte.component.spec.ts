import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NparteComponent } from './nparte.component';

describe('NparteComponent', () => {
  let component: NparteComponent;
  let fixture: ComponentFixture<NparteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NparteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NparteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
