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
  const buttonTxt = screen.getByText(/theme/i);
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
  const toggleButton = screen.getByRole('button', {name: 'theme'});
  fireEvent.click(toggleButton);
  expect(document.documentElement.style.getPropertyValue('--bg-color')).toBe('black');
  fireEvent.click(toggleButton);
  expect(document.documentElement.style.getPropertyValue('--bg-color')).toBe('grey');
});

test('finds the 24th post on 12th filter and 2nd post load', async () => {
  render(<App/>);
  const loadFilterButton = screen.getByRole('button', {name: '12'});
  fireEvent.click(loadFilterButton);
  await waitFor(() => {
    const loadMorePostsButton = screen.getByRole('button', {name: 'Load more posts'});
    fireEvent.click(loadMorePostsButton);
    const textSearch = screen.getByText('autem hic labore sunt dolores incidunt');
    expect(textSearch).toBeInTheDocument();
  })
});

test('No more posts for -10 filter', async () => {
  render(<App/>);
  const charFilterButton = screen.getByRole('button', {name: '-10'});
  fireEvent.click(charFilterButton);
  await waitFor(() => {
    const noMorePostsH4 = screen.getByRole('heading', {name: 'No more posts'});
    expect(noMorePostsH4).toBeInTheDocument();
  })
})

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
