import { render, screen } from '@testing-library/react';
import MyClubsPage from './MyClubsPage';

escribe('MyClubsPage', () => {
    it('renders page title', () => {
        render(<MyClubsPage />);
        expect(screen.queryByText('My Clubs')).toBeTruthy();
    });
});
