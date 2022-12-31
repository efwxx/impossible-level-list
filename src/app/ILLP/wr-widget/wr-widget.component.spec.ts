import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrWidgetComponent } from './wr-widget.component';

describe('WrWidgetComponent', () => {
  let component: WrWidgetComponent;
  let fixture: ComponentFixture<WrWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
