import { useEffect, useState } from 'react'
import { isAuthenticatedUser } from '../apiList/userauthApi'
import { useDispatch } from 'react-redux'
import { setUser } from '../slices/user'
import { AppDispatch } from '../store/store'

const useIsAuthenticated = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [userAuthLoading, setUserAuthLoading] = useState<boolean>(true)
  useEffect(() => {
    const checkAuth = async () => {
      setUserAuthLoading(true)
      try {
        const { ok, data }: { ok: boolean; data: any } = await isAuthenticatedUser();

        // console.log("data from isUSer authenticated hook", data)
        if (ok) {
          dispatch(setUser({
            isAuthenticated: true,
            userId: data._id,
            phoneNumber: data.phoneNumber,
            address: data?.address || null,
            userName: data.userName,
            email: data.email,
          }));
        } else {
          dispatch(setUser({
            userId: null,
            isAuthenticated: false,
            phoneNumber: null,
            address: null,
            userName: null,
            email: null,
          }));
        }
      } catch (error) {
        // console.log("errror from useIsAuthenticated", error)
        dispatch(setUser({
          userId: null,
          isAuthenticated: false,
          phoneNumber: null,
          address: null,
          userName: null,
          email: null,
        }));
      }
      finally {
        setUserAuthLoading(false)
      }
    };

    checkAuth();
  }, [dispatch]);

  return { userAuthLoading  }


}

export default useIsAuthenticated