import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUsers";

import "./UserDetails.scss";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useUser(+id!);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className="user-details">
      <h1>
        {data.firstName} {data.lastName}
      </h1>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <p>
        <strong>Age:</strong> {data.age}
      </p>
      <p>
        <strong>Gender:</strong> {data.gender}
      </p>
      <p>
        <strong>Phone:</strong> {data.phone}
      </p>
      <div className="address">
        <p>
          <strong>Country:</strong> {data.address.country}
        </p>
        <p>
          <strong>City:</strong> {data.address.city}
        </p>
        <p>
          <strong>State:</strong> {data.address.state}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
