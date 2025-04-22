import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladoListComponent } from './simulado-list.component';

describe('SimuladoListComponent', () => {
  let component: SimuladoListComponent;
  let fixture: ComponentFixture<SimuladoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimuladoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
