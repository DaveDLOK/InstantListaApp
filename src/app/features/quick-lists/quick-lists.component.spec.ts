import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickListsComponent } from './quick-lists.component';

describe('QuickListsComponent', () => {
  let component: QuickListsComponent;
  let fixture: ComponentFixture<QuickListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
