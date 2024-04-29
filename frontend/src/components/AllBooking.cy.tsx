import React from 'react'
import AllBooking from './AllBooking'
import getBookings from '@/libs/getBookings';

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

describe('<AllBooking />', () => {
  it('renders', async () => {
    // const response = await getBookings("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmY0YTQwMzkyNzMzYTMzNTc3ZDAyMCIsImlhdCI6MTcxNDM5OTAxOCwiZXhwIjoxNzE2OTkxMDE4fQ.Tg8xFivqo8SZ0POG9XZHZ22PqXjmLyXKhajGv_T0hew");
    // // see: https://on.cypress.io/mounting-react
    // cy.mount(<AllBooking bookingsJson={response.json()} />)
    
    cy.visit('/review?id=662f6b34cf995f4be336f995&name=BednarWard')

    cy.contains(`BednarWard`).should('exist');
  })
})