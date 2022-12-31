import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllpHomePageComponent } from './illp-home-page.component';

describe('IllpHomePageComponent', () => {
  let component: IllpHomePageComponent;
  let fixture: ComponentFixture<IllpHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllpHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IllpHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
