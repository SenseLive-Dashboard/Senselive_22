import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorgraphComponent } from './errorgraph.component';

describe('ErrorgraphComponent', () => {
  let component: ErrorgraphComponent;
  let fixture: ComponentFixture<ErrorgraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorgraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
