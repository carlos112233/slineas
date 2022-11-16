import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrgeneradorComponent } from './qrgenerador.component';

describe('QrgeneradorComponent', () => {
  let component: QrgeneradorComponent;
  let fixture: ComponentFixture<QrgeneradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrgeneradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrgeneradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
