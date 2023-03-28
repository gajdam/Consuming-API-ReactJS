import {getByText, render, screen, within} from '@testing-library/react';
import App from './App';

test('displays container correctly', () => {
  render(<App />);
  const linkElement = screen.getByText(/Posts/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders posts list', () => {
  render(<App />);
  const commentsList = screen.getByRole('list');
  expect(commentsList).toBeInTheDocument();
});

test('renders the first post', async () => {
  render(<App />);
  const postTitle = await screen.findByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
  expect(postTitle).toBeInTheDocument();
  // const posts = await screen.findAllByRole('heading', { level: 3 });
  // expect(posts).toHaveLength(1);
});



