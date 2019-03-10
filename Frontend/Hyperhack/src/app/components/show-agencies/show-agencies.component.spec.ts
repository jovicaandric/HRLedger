import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAgenciesComponent } from './show-agencies.component';

describe('ShowAgenciesComponent', () => {
  let component: ShowAgenciesComponent;
  let fixture: ComponentFixture<ShowAgenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAgenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
