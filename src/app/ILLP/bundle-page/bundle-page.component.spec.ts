import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlePageComponent } from './bundle-page.component';

describe('BundlePageComponent', () => {
  let component: BundlePageComponent;
  let fixture: ComponentFixture<BundlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BundlePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BundlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
