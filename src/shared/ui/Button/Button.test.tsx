import { render, screen } from '@testing-library/react';
import { Button, ThemeButton } from './Button';

describe('Button', () => {
  test('Test render', () => {
    render(<Button></Button>);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  test('Test clear theme', () => {
    render(<Button theme={ThemeButton.CLEAR}></Button>);
    expect(screen.getByTestId('button')).toHaveClass('clear');
    screen.debug();
  });
});
