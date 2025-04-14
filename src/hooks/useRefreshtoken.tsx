import  { useEffect } from 'react'

const useRefreshtoken =  () => {

    useEffect(()=>{
        const getRefreshtoken = async ()=>{
           try{
            let data:any = await getRefreshtoken()
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