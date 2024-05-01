import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/navbar';
import UserPoint from '@/components/UserPoint';

const userMock = {
    user: {
        "_id": "662f4a40392733a33577d020",
        "name": "user",
        "telephone": "12345678",
        "email": "user@gmail.com",
        "currentPoint": 3,
        "role": "user",
        "createdAt": "2024-04-29T07:20:32.493Z",
        "__v": 0,
        "id": "662f4a40392733a33577d020"
    }
}
// Mock useRouter hook
jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        prefetch: jest.fn().mockResolvedValue(undefined)
    })
}));

// Mock useSession hook
jest.mock('next-auth/react', () => ({
    useSession: jest.fn().mockReturnValue({
        data: null,
        user: {
            "_id": "662f4a40392733a33577d020",
            "name": "user",
            "telephone": "12345678",
            "email": "user@gmail.com",
            "currentPoint": 3,
            "role": "user",
            "createdAt": "2024-04-29T07:20:32.493Z",
            "__v": 0,
            "id": "662f4a40392733a33577d020"
        }
    })
}));

/*
As a user 
I want to see current point
so that I can see my point and make decision whether to make booking or not
*/


test('User shall allow to check their point', async () => {

    render(<UserPoint userPoint={userMock.user.currentPoint} name={userMock.user.name} email={userMock.user.email} />);

    expect(screen.queryByText('Point : 3')).toBeInTheDocument();

});

