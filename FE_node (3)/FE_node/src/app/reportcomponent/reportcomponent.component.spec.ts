import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportcomponentComponent } from './reportcomponent.component';

describe('ReportcomponentComponent', () => {
  let component: ReportcomponentComponent;
  let fixture: ComponentFixture<ReportcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
