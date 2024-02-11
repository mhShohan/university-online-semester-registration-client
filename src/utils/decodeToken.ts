import { jwtDecode, JwtPayload } from "jwt-decode";

interface IToken extends JwtPayload {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const decodeToken = (token: string) => {
  if (typeof token === 'string') {
    return jwtDecode(token) as IToken
  } else {
    return null
  }
}

export default decodeToken