import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { Login } from './Login.js';
import { getAuth } from 'firebase/auth'
import { useUser } from '../../authentication/context.js'

jest.mock('firebase/auth', () => ({ getAuth: jest.fn() }));
jest.mock('../Firebase/context', () => {
    const originalModule = jest.requireActual('../Firebase/context')
    return ({ ...originalModule, useUser: jest.fn() })
});

describe('Login', () => {

    it('Displays Log In button when not logged in', () => {
        useUser.mockImplementation(() => null)
        getAuth.mockImplementation(() => null)
        render(<Login/>);
        expect(screen.getByText('Log In')).toBeInTheDocument();
    });

    it('Displays Log Out button when logged in', () => {
        useUser.mockImplementation(() => ({user: {}}))
        render(<Login/>);
        expect(screen.getByText('Log Out')).toBeInTheDocument();

    });
})
