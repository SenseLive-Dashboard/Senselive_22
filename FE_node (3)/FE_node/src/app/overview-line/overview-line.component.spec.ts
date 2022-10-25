import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewLineComponent } from './overview-line.component';

describe('OverviewLineComponent', () => {
  let component: OverviewLineComponent;
  let fixture: ComponentFixture<OverviewLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
