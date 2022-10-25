import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortweekComponent } from './sortweek.component';

describe('SortweekComponent', () => {
  let component: SortweekComponent;
  let fixture: ComponentFixture<SortweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortweekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
