import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDialogComponent } from './assign-dialog.component';

describe('AssignDialogComponent', () => {
  let component: AssignDialogComponent;
  let fixture: ComponentFixture<AssignDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
