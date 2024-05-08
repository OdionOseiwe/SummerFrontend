import { useReadContract } from "thirdweb/react";

const useRead = (contract,method,params) => {
       
    const { data, isLoading,error} = useReadContract({
        contract,
        method: method,
        params:params
    });
    return [data, isLoading, error];       
  };
  
export default useRead;


