import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRuleFormComponent } from './access-rule-form.component';

describe('AccessRuleFormComponent', () => {
  let component: AccessRuleFormComponent;
  let fixture: ComponentFixture<AccessRuleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessRuleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessRuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
