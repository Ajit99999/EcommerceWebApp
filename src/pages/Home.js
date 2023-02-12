import Hero from "../components/Hero";
import Service from "../components/Service";
import useContextHook from "../hooks/useContextHook";
import Feature from "./Feature";

const Home = () => {
  const { state } = useContextHook();

  return (
    <>
      <Hero />
      <Feature state={state} />
      <Service />
    </>
  );
};

export default Home;
