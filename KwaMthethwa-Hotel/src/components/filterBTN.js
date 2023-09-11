export default function FilterBTN({ active, setActive, name }) {
  //   const [isActive, setIsActive] = useState(false);

  //   useEffect(() => {
  //     setIsActive();
  //   }, [active, name]);

  const handleClick = () => {
    setActive(name);
    //console.log("filterBTN line 12 active: ", active);
  };

  return (
    <button
      style={
        active === name
          ? {
              padding: 10,
              width: "10vw",
              marginRight: 5,
              backgroundColor: "#e3d7ff",
              fontWeight: 700,
            }
          : { padding: 10, width: "10vw", marginRight: 5 }
      }
      onClick={handleClick}
    >
      {name}
    </button>
  );
}
