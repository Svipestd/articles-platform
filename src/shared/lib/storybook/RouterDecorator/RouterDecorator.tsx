import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (Story: any) => {
  return (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  );
};
