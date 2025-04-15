import { render, screen } from '@testing-library/react';
import { Button, ButtonVariant } from './Button';

describe('Button', () => {
  test('Test render', () => {
    render(<Button></Button>);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  test('Test text theme', () => {
    render(<Button variant={ButtonVariant.TEXT}></Button>);
    expect(screen.getByTestId('button')).toHaveClass('clear');
  });
});
