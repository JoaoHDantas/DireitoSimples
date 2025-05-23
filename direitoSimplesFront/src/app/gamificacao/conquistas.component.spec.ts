import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConquistasComponent } from './conquistas.component';

describe('ConquistasComponent', () => {
  let component: ConquistasComponent;
  let fixture: ComponentFixture<ConquistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConquistasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConquistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
