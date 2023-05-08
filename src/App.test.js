import {fireEvent, getByRole, getByText, render, screen, waitFor} from '@testing-library/react';
import App from './App';
import ScrollUpButton from "./ScrollUpButton";
import Comments from "./Comments";
import Posts from "./Posts";

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

//SCROLL-UP-BTN tests

test('does not render the button when isVisible is false', () => {
  render(<ScrollUpButton/>);
  const button = screen.queryByRole('button');
  expect(button).not.toBeInTheDocument();
});

//Comment tests

test('renders first comment on the first post', async () => {
  render(<App />);
  await waitFor(() => {
    const comment = screen.getByText('id labore ex et quam laborum');
    expect(comment).toBeInTheDocument();
  });
});

test('renders Load more btn in first post', async () => {
  const postId = 1;
  render(<Comments postId={postId} />);
  await waitFor(() => {
    const btn = screen.getByRole('button', {name: 'Load more'})
    expect(btn).toBeInTheDocument();
  });
});

test('renders Hide btn after loading all comms in the first post', async () => {
  const postId = 1;
  render(<Comments postId={postId} />);
  await waitFor(() => {
    const btn = screen.getByRole('button', {name: 'Load more'});
    fireEvent.click(btn);
    const hideBtn = screen.getByRole('button', {name: 'Hide'});
    expect(hideBtn).toBeInTheDocument();
  });
});
