import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import CreateBookService from './CreateBookService';

describe('CreateBook', () => {
  let fakeBooksRepository: FakeBooksRepository;
  let createBookService: CreateBookService;

  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository();
    createBookService = new CreateBookService(fakeBooksRepository);
  });

  it('should be able to create a new book', async () => {
    const book = await createBookService.execute({
      userId: 'user_id',
      title: '1998',
      pages: 100,
    });

    expect(book).toHaveProperty('id');
    expect(book.ownerId).toBe('user_id');
  });
});
