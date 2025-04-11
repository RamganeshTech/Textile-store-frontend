import { useEffect } from 'react'
import { isAuthenticatedUser } from '../apiList/userauthApi'
import { useDispatch } from 'react-redux'
import { setUser } from '../slices/user'
import { AppDispatch } from '../store/store'

const useIsAuthenticated = async () => {

    const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { ok, data }: { ok: boolean; data: any } = await isAuthenticatedUser();

        console.log("data from isUSer authenticated hook", data)
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
        console.log("errror from useIsAuthenticated", error)
        dispatch(setUser({
          userId: null,
          isAuthenticated: false,
          phoneNumber: null,
          address: null,
          userName: null,
          email: null,
        }));
      }
    };

    checkAuth();
  }, [dispatch]);
}

export default useIsAuthenticated