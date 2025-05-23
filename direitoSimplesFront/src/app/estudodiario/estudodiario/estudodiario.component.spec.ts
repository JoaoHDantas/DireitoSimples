import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstudoDiarioComponent } from './estudodiario.component';

describe('EstudoDiarioComponent', () => {
  let component: EstudoDiarioComponent;
  let fixture: ComponentFixture<EstudoDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudoDiarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudoDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
});
