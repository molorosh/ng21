import { vi, describe, beforeEach, it, expect } from 'vitest';
import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

// Mock DataStore before importing the App so the real constructor isn't invoked during tests.
vi.mock('./persistence/data-store.class', () => {
  const ctor = vi.fn(function (this: any, idbf: unknown, name: string) {
    // minimal shape resembling a DataStore instance for assertions
    this.idbf = idbf;
    this.name = name;
  });
  return { DataStore: ctor };
});

describe('App', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [App]
      , providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('ng-twenty-one');
  });

  it('should attach a DataStore instance to the component', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as any;
    expect(app.dataStore).toBeTruthy();
    // our mock sets a "name" property during construction
    expect(app.dataStore.name).toBe('ng-twenty-one');
  });

  it('exposes the title signal with the expected initial value', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as any;
    // protected 'title' signal is accessible via bracket notation in tests
    expect(typeof app.title).toBe('function');
    expect(app.title()).toBe('ng-twenty-one');
  });
});
