import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListEditorComponent } from './admin-list-editor.component';

describe('AdminListEditorComponent', () => {
  let component: AdminListEditorComponent;
  let fixture: ComponentFixture<AdminListEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
