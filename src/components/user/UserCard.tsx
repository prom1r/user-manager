import { User } from "../../types/User";
import "./UserCard.scss";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
      <h1>{user.username}</h1>
      <h2>{user.firstName}</h2>
      <h3>{user.lastName}</h3>
      <p>{user.age}</p>
      <p>{user.address.city}</p>
    </div>
  );
};

export default UserCard;
