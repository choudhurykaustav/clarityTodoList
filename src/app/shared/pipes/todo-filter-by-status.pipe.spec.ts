import { TodoFilterByStatusPipe } from './todo-filter-by-status.pipe';

describe('TodoFilterByStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new TodoFilterByStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
