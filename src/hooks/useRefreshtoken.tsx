import  { useEffect } from 'react'

const useRefreshtoken =  () => {

    useEffect(()=>{
        const getRefreshtoken = async ()=>{
           try{
            await getRefreshtoken()
           }
           catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
           
           }
        }

         getRefreshtoken()
    }, [])


    return {}
}

export default useRefreshtoken