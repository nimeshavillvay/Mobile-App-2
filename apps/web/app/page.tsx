import User from "./user";

const HomePage = () => {
  return (
    <>
      <h1 className="text-2xl font-medium text-gray-800">Home Page</h1>

      <User id={1} />
      <User id={2} />
      <User id={3} />
    </>
  );
};

export default HomePage;
