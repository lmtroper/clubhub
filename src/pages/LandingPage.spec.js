import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage'

describe('Landing Page', () => {
    it('renders University of Waterloo', () => {
        render(<LandingPage />);
        expect(screen.queryByText('University of Waterloo')).toBeTruthy();
    });
});
