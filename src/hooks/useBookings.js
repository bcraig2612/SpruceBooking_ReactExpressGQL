import { useQuery, gql } from "@apollo/client";

const getBookings = gql`
  query ($filterBy: BookingFilterInput) {
    bookings(filterBy: $filterBy) {
      total
      bookings {
        id
        email
        type
        status
        name
        address
        serviceDate
      }
    }
  }
`;

export const useBookings = () => {
    const { error, loading, data } = useQuery(getBookings);

    return {
        error,
        loading,
        data
    };
};