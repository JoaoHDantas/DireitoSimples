import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicionavbarComponent } from './inicionavbar.component';

describe('InicionavbarComponent', () => {
  let component: InicionavbarComponent;
  let fixture: ComponentFixture<InicionavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicionavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicionavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
