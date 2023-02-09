
import React, {useState} from "react"
import axios from "axios"

export default function Login (props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("email", e.target.email.value)
        const data = {
            email: email,
            password: password
        }
       axios.post("http://localhost:3000/api/v1/auth/login", data).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}