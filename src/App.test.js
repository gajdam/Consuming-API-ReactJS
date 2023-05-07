import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
//posts

// test('displays container correctly', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Posts/i);
//   expect(linkElement).toBeInTheDocument();
// });

//after clean-up change this test doesn't work
// test('renders posts list', () => {
//   render(<App />);
//   const postsList = screen.getByRole('list');
//   expect(postsList).toBeInTheDocument();
// });

// test('renders the first post', async () => {
//   render(<App />);
//   const postTitle = await screen.findByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
//   expect(postTitle).toBeInTheDocument();
// });

// test('renders load more button', () => {
//   render(<App />);
//     const button = screen.getByRole('button', { name: 'Load more' });
//     expect(button).toBeInTheDocument();
// });

//APP Component tests

test('renders app component', () => {
  render(<App />);
  const appContainer = screen.getByTestId('container');
  expect(appContainer).toBeInTheDocument();
});

test('renders theme toggle button', () => {
  render(<App />);
  const buttonTxt = screen.getByText(/click/i);
  expect(buttonTxt).toBeInTheDocument();
});

test('renders "Posts" button', () => {
  render(<App />);
  const buttonTxt = screen.getByRole('button', {name: 'Posts'});
  expect(buttonTxt).toBeInTheDocument();
});

test('renders "Albums" button', () => {
  render(<App />);
  const buttonTxt = screen.getByRole('button', {name: 'Albums'});
  expect(buttonTxt).toBeInTheDocument();
});

test('renders Posts component by default', () => {
  render(<App />);
  const postsButton = screen.getByRole('button', {name: 'Posts'});
  expect(postsButton).toHaveAttribute('disabled');
});

test('renders Albums component after clicking Albums button', () => {
  render(<App />);
  const albumsButton = screen.getByRole('button', {name: 'Albums'});
  fireEvent.click(albumsButton);
  const postsButton = screen.getByRole('button', {name: 'Posts'});
  expect(postsButton).not.toHaveAttribute('disabled');
});

test('changes theme on button click', () => {
  render(<App/>);
  const toggleButton = screen.getByRole('button', {name: 'click'});
  fireEvent.click(toggleButton);
  expect(document.documentElement.style.getPropertyValue('--bg-color')).toBe('black');
  fireEvent.click(toggleButton);
  expect(document.documentElement.style.getPropertyValue('--bg-color')).toBe('grey');
});


























