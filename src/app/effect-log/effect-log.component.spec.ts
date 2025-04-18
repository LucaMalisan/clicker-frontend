import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectLogComponent } from './effect-log.component';

describe('EffectLogComponent', () => {
  let component: EffectLogComponent;
  let fixture: ComponentFixture<EffectLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EffectLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
