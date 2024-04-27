import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultDashboardComponent } from './default-dashboard.component';

describe('DefaultDashboardComponent', () => {
  let component: DefaultDashboardComponent;
  let fixture: ComponentFixture<DefaultDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
