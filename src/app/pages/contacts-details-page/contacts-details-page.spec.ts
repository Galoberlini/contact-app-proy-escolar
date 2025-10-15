import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsDetailsPage } from './contacts-details-page';

describe('ContactsDetailsPage', () => {
  let component: ContactsDetailsPage;
  let fixture: ComponentFixture<ContactsDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
