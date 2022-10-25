import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlVNKWComponent } from './vl-vn-kw.component';

describe('VlVNKWComponent', () => {
  let component: VlVNKWComponent;
  let fixture: ComponentFixture<VlVNKWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VlVNKWComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VlVNKWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
