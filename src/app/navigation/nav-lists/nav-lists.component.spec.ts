import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavListsComponent } from './nav-lists.component';

describe('NavListsComponent', () => {
  let component: NavListsComponent;
  let fixture: ComponentFixture<NavListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
