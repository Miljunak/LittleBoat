import { MyFilterPipe } from './myfilter.pipe';

describe('MyfilterPipe', () => {
  it('create an instance', () => {
    const pipe = new MyFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
