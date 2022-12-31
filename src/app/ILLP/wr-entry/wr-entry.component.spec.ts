import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrEntryComponent } from './wr-entry.component';

describe('WrEntryComponent', () => {
  let component: WrEntryComponent;
  let fixture: ComponentFixture<WrEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
