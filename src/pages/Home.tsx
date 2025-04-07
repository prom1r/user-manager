import { useUsers } from "../hooks/useUsers";

const Home = () => {
  const { data, isLoading, error } = useUsers();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.users.map((user: any) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
