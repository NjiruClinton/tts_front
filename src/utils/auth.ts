import client from './graphqlClient'

const SIGNUP_MUTATION = `
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`

const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        firstName
        lastName
        createdAt
      }
    }
  }
`
const UPDATE_USER_MUTATION = `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      firstName
      lastName
      email
    }
  }
`
const DELETE_USER_MUTATION = `
  mutation DeleteUser {
    deleteUser
  }
`
// mutation VerifyToken {
//   verifyToken(
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ0ZXN0c0BleGFtcGxlLmNvbSIsImlhdCI6MTc0MzI2MDExNywiZXhwIjoxNzQzMjYzNzE3fQ.19Zmup1pLquCMgYE5scm1AeWNEsObIIeIitnLXaNGKs"
//   )
// }
const VERIFY_TOKEN_MUTATION = `
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token)
  }
`

export const signup = async (firstName: string, lastName: string, email: string, password: string) => {
  const variables = {
    input: { firstName, lastName, email, password },
  }
  const response: any = await client.request(SIGNUP_MUTATION, variables)
  return response.signup
}

export const login = async (email: string, password: string) => {
  const variables = {
    input: { email, password },
  }
  const response: any = await client.request(LOGIN_MUTATION, variables)
  return response.login
}

export const updateUser = async (firstName: string, lastName: string, email: string) => {
    const token = sessionStorage.getItem('token');
    const variables = {
        input: { firstName, lastName, email },
    };
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const response: any = await client.request(UPDATE_USER_MUTATION, variables, headers);
    return response.updateUser;
}

export const deleteUser = async () => {
    const token = sessionStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const response: any = await client.request(DELETE_USER_MUTATION, {}, headers);
    return response.deleteUser;
}
export const logout = () => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
  sessionStorage.removeItem('tempLoginCredentials')
}
export const verifyToken = async (token: string | null) => {
    if (!token) {
        logout()
        return false
    }
    const variables = {
        token,
    }
    const response: any = await client.request(VERIFY_TOKEN_MUTATION, variables)
    if (!response.verifyToken) {
        logout()
        return false
    }
    return response.verifyToken
}