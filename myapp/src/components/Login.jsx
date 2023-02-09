
const Login = () => {
    const [user, setUser] = useState({
      email: "",
      password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const loginHandler = async (e) => {
      e.preventDefault();
  
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
      try {
        const { data } = await axios.post(
          `${global.API_ENDPOINT}/api/auth/login`,
          user,
          config
        );
        localStorage.setItem("authToken", data.token);
        navigate("/");
      } catch (error) {
        setError(error?.response?.data?.error);
        setTimeout(() => {
          setError("");
        }, 3 * 1000);
      }
    };
  
    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
    return (
      <div></div>
    );
  };

export default Login;