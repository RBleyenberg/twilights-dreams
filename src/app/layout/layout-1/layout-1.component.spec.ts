
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Layout1Component } from './layout-1.component';

describe('Layout1Component', () => {
  let component: Layout1Component;
  let fixture: ComponentFixture<Layout1Component>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [Layout1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layout1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
