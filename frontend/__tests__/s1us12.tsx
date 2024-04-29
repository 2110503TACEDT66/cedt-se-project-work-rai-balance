import { render, screen, waitFor } from '@testing-library/react';
import AllBooking from '@/components/AllBooking';
import { BookingItem2, BookingJson } from 'interface';
import getBookings from '@/libs/getBookings';

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

const bookingJsonMock = {
    success: true,
    count: 2,
    data: [
        {
            _id: "662f4a6167932a94368ba549",
            apptDate: "2024-04-28T00:00:00.000Z",
            user: "662f4a40392733a33577d020",
            coworking: {
                _id: "65e29f14ccf74188031ddc21",
                name: "Maurice Gleichner",
                province: "Bangkok",
                id: "65e29f14ccf74188031ddc21"
            },
            start: "09:00:00",
            end: "10:00:00",
            hasReview: "approved",
            createAt: "2024-04-29T07:21:05.054Z",
            __v: "0"
        },
        {
            _id: "662f6b34cf995f4be336f995",
            apptDate: "2024-04-24T00:00:00.000Z",
            user: "662f4a40392733a33577d020",
            coworking: {
                _id: "65e2a0fdccf74188031ddc38",
                name: "BednarWard",
                province: "Mali",
                id: "65e2a0fdccf74188031ddc38"
            },
            start: "08:00:00",
            end: "10:00:00",
            hasReview: "no",
            createAt: "2024-04-29T09:41:08.497Z",
            __v: "0"
        }
    ]
};

/*
As a user
I want to remove booking that I don't want go and is not yet due
so that I can retrieve my spent point
*/

test('User shall allow to delete their reservations', async () => {

    // render(<AllBooking bookingsJson={Promise.resolve(bookingJsonMock)} />);

    // expect(screen.queryByText('Editing and deleting are no longer available')).toBeInTheDocument();
});

