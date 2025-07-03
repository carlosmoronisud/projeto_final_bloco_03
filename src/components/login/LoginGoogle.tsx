import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../../contexts/AuthContext'


interface GoogleTokenPayload {
  name: string
  email: string
  picture: string
}

export default function LoginGoogle() {
  const { setUser } = useAuth()

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const token = credentialResponse.credential
          if (token) {
            const decoded = jwtDecode<GoogleTokenPayload>(token)
            setUser({
              name: decoded.name,
              email: decoded.email,
              picture: decoded.picture
            })
          }
        }}
        onError={() => console.log('Erro ao fazer login')}
      />
    </div>
  )
}