import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleElemComponent } from './role-elem.component';

describe('RoleElemComponent', () => {
  let component: RoleElemComponent;
  let fixture: ComponentFixture<RoleElemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleElemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
