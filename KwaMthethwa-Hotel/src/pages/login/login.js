import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../features/login/loginSlice";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/footer/footer";

export default function Login() {
  const { validPwd, validUsername, isLoggedIn } = useSelector(
    (store) => store.login
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handeLogin = () => {
    dispatch(
      setLogin([
        document.getElementById("id").value,
        document.getElementById("password").value,
      ])
    );
  };

  if (isLoggedIn) {
    navigate("/Profile");
  }

  return (
    <>
      <div id="mainView">
        <div className=" w3-card-4 w3-round-large w3-white">
          <div
            style={{
              border: "none",
              borderBottom: "1px black solid",
              backgroundColor: "#d4af37",
              padding: 20,
            }}
          >
            <h1
              style={{
                fontWeight: "500",
              }}
            >
              Log in
            </h1>
            <p>Enter your credentials to access your account.</p>
            <br />
          </div>
          <br />
          <div style={{ padding: "20px" }}>
            <label htmlFor="id">Username</label>
            <input type="text" id="id" className="w3-round" />
            <br />
            {validUsername === 2 ? (
              <span className="w3-red">Invalid username</span>
            ) : (
              <br />
            )}
            <label htmlFor="id">Password</label>
            <br />
            <input type="password" id="password" className="w3-round" />
            <br />
            {validPwd === 2 ? (
              <span className="w3-red">Invalid password</span>
            ) : (
              <br />
            )}
            <br />
            <button
              className="limeButton w3-border w3-border-black w3-ripple w3-round-large"
              onClick={handeLogin}
              style={{ marginRight: "2vw", padding: "10px" }}
            >
              Log in
            </button>
            <br />
            <p
              style={{ color: "#6874e8", cursor: "pointer" }}
              onClick={() => navigate("/Register")}
            >
              <br />
              Don't have an account? Sign up here!
            </p>
            <br /> <br />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
