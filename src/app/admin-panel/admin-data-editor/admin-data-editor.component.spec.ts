import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDataEditorComponent } from './admin-data-editor.component';

describe('AdminDataEditorComponent', () => {
  let component: AdminDataEditorComponent;
  let fixture: ComponentFixture<AdminDataEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDataEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDataEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
