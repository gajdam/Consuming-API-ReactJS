import {getByRole, getByText, render, screen, within} from '@testing-library/react';
import App from './App';
//posts

test('displays container correctly', () => {
  render(<App />);
  const linkElement = screen.getByText(/Posts/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders posts list', () => {
  render(<App />);
  const postsList = screen.getByRole('list');
  expect(postsList).toBeInTheDocument();
});

test('renders the first post', async () => {
  render(<App />);
  const postTitle = await screen.findByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
  expect(postTitle).toBeInTheDocument();
});

test('renders load more button', () => {
  render(<App />);
  setTimeout(() => {
    const button = screen.getByRole('button', { name: 'Load more' });
    expect(button).toBeInTheDocument();
  }, 1000); // test delay due to slow page loading
});





















