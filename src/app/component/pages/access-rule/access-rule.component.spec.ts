import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRuleComponent } from './access-rule.component';

describe('AccessRuleComponent', () => {
  let component: AccessRuleComponent;
  let fixture: ComponentFixture<AccessRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
