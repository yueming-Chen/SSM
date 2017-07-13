import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllScoreComponent } from './view-all-score.component';

describe('ViewAllScoreComponent', () => {
  let component: ViewAllScoreComponent;
  let fixture: ComponentFixture<ViewAllScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
