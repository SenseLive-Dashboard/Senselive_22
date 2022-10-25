import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortLineComponent } from './sort-line.component';

describe('SortLineComponent', () => {
  let component: SortLineComponent;
  let fixture: ComponentFixture<SortLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
