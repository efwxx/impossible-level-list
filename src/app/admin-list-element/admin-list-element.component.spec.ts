import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListElementComponent } from './admin-list-element.component';

describe('AdminListElementComponent', () => {
  let component: AdminListElementComponent;
  let fixture: ComponentFixture<AdminListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
